import {NoroffAPI} from "./api/index.js";

const api = new NoroffAPI("https://v2.api.noroff.dev")

const user = await api.login ("natnoppol@gmail.com", "fakePassword")