import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Home from './components/Home';
import EmptyBoard from './components/EmptyBoard';
import boardsSlice from './redux/boardsSlice';
import { deleteTask, getTasks } from './services/baseUrl';

function App() {
	const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
	const dispatch = useDispatch();
	const boards = useSelector((state) => state.boards);
	const activeBoard = boards.find((board) => board.isActive);
	if (!activeBoard && boards.length > 0)
		dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		getTasks().then((data) => {
			
			console.log(data.data);
			const tasksArray = data.data.reduce((acc, obj) => {
				return [...acc, ...obj.tasks];
			}, []);
			console.log(tasksArray);

			dispatch(boardsSlice.actions.initialBoard(tasksArray));
			setLoading(false);
		});
	}, []);

	if (loading) {
		return;
	}
	return (
		<div className=' overflow-hidden  overflow-x-scroll'>
			<>
				{boards.length > 0 ? (
					<>
						<Header
							setIsBoardModalOpen={setIsBoardModalOpen}
							isBoardModalOpen={isBoardModalOpen}
						/>
						<Home
							setIsBoardModalOpen={setIsBoardModalOpen}
							isBoardModalOpen={isBoardModalOpen}
						/>
					</>
				) : (
					<>
						<EmptyBoard type='add' />
					</>
				)}
			</>
		</div>
	);
}

export default App;
