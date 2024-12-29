import { randomUUID } from "node:crypto";

interface AsnwerProps {
	content: string;
	authorId: string;
	questionId: string;
}

export class Aswer {
	public id: string;
	public content: string;
	public authorId: string;
	public questionId: string;

	constructor(props: AsnwerProps, id?: string) {
		this.content = props.content;
		this.authorId = props.authorId;
		this.questionId = props.questionId;
		this.id = id ?? randomUUID();
	}
}
