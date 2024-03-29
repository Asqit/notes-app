export type Tag = {
	id: string;
	label: string;
};

export type NoteData = {
	title: string;
	markdown: string;
	tags: Tag[];
};

export type Note = {
	id: string;
	tags: Tag[];
} & NoteData;

export type RawNote = {
	id: string;
} & RawNoteData;

export type RawNoteData = {
	title: string;
	markdown: string;
	tagIds: string[];
};
