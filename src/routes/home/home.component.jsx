import Directories from '../../components/directory/directory.component';
import { Outlet } from 'react-router-dom';

const Home = () => {
	const categories = [
		{
			id: 1,
			title: 'Hats',
			imageUrl:
				'https://images.pexels.com/photos/5698918/pexels-photo-5698918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		{
			id: 2,
			title: 'Jackets',
			imageUrl:
				'https://images.pexels.com/photos/6800329/pexels-photo-6800329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		{
			id: 3,
			title: 'Sneakers',
			imageUrl:
				'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		{
			id: 4,
			title: 'Womens',
			imageUrl:
				'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
		{
			id: 5,
			title: 'Mens',
			imageUrl:
				'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		},
	];

	return (
		<div>
			<Directories categories={categories} />
			<Outlet />
		</div>
	);
};

export default Home;
