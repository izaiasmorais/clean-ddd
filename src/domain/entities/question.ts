import { Optional } from "../../core/@types/optional";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import dayjs from "dayjs";

interface QuestionProps {
	authorId: UniqueEntityID;
	bestAnswerId?: UniqueEntityID;
	title: string;
	content: string;
	slug: string;
	createdAt: Date;
	updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
	get content() {
		return this.props.content;
	}

	get title() {
		return this.props.title;
	}

	get slug() {
		return this.props.slug;
	}

	get bestAnswerId() {
		return this.props.bestAnswerId;
	}

	get authorId() {
		return this.props.authorId;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get isNew(): boolean {
		return dayjs().diff(this.createdAt, "days") <= 3;
	}

	get excerpt() {
		return this.content.substring(0, 120).trimEnd().concat("...");
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	set content(value: string) {
		this.props.content = value;
		this.touch();
	}

	set title(value: string) {
		this.props.title = value;
		this.props.slug = value.toLowerCase().replace(/\s/g, "-");
		this.touch();
	}

	set bestAnswerId(value: UniqueEntityID | undefined) {
		this.props.bestAnswerId = value;
		this.touch();
	}

	static create(
		props: Optional<QuestionProps, "createdAt" | "slug">,
		id?: UniqueEntityID
	) {
		const question = new Question(
			{
				...props,
				slug: props.slug
					? props.title.toLowerCase().replace(/\s/g, "-")
					: props.title.toLowerCase().replace(/\s/g, "-"),
				createdAt: new Date(),
			},
			id
		);

		return question;
	}
}
