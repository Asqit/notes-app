import { Tag } from "~/types";
import { Link } from "react-router-dom";
import { Card, Stack, Badge } from "react-bootstrap";
import styles from "./NoteCard.module.css";

interface ISimplifiedNote {
	id: string;
	title: string;
	tags: Tag[];
}

export default function NoteCard(props: ISimplifiedNote) {
	const { id, title, tags } = props;

	return (
		<Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
			<Card.Body>
				<Stack gap={2} className='align-items-center justify-content-center h-100'>
					<span className='fs-5'>{title}</span>

					{tags.length > 0 ? (
						<Stack gap={1} direction='horizontal' className='justify-content-center'>
							{tags.map((tag) => (
								<Badge className='text-truncate' key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					) : null}
				</Stack>
			</Card.Body>
		</Card>
	);
}
