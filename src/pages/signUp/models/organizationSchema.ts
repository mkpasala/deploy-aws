import * as yup from "yup";

export const entityTypes = [
	"501(c)(3) - Public Charity",
	"501(c)(3) - Private Foundation",
	"501(c)(3) - Private Operating Foundation",
	"501(c)(4) - Social Welfare Organization",
	"501(c)(6) - Business Leagues, Chambers of Commerce, Real Estate Boards",
	"501(c)(8) - Fraternal Beneficiary Societies and Associations",
	"501(c)(10) - Domestic Fraternal Societies and Associations",
	"527  - Political Organization ",
];

export const organizationSchema = yup.object().shape({
	name: yup.string().required("Organization Name is required"),
	entityType: yup.string().required("Entity type is required"),
});
