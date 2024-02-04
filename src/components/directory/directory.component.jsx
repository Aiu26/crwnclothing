import { DirectoryContainer } from './directory.styles';
import DirectoryItem from '../directory-item/directory-item.component';
const Directories = ({ categories }) => {
	return (
		<DirectoryContainer>
			{categories.map((category) => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</DirectoryContainer>
	);
};

export default Directories;
