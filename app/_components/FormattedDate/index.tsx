import React from "react";

const FormattedDate = ({ date }: { date: Date }) => {
	const formattedDate = date.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return <span>{formattedDate}</span>;
};

export default FormattedDate;
