import { API } from "aws-amplify";

class QuickbooksAuthService {
	 getQuickbooksAuthUrl = async () => await API.get("flareapi", "/getQuickbooksCode", {});
	 getQuickbooksTokens = async (url: string) => await API.post("flareapi", "/getQuickbooksTokens", {body: {url}});
}

export default QuickbooksAuthService
