import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { LoginResponce } from "../assets/helpers/interfaces/auth.interface";
import { PREFIX } from "../assets/helpers/api";
import { Profile } from "../assets/helpers/interfaces/user.interface";
import { RootState } from "@reduxjs/toolkit/query";


export const JWT_PERSISTENT_STATE = 'userData';

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string | null,
    profile?: Profile;
}

export interface UserPersisterntState {
    jwt: string | null;
}

const initialState: UserState = {
	jwt: loadState<UserPersisterntState>(JWT_PERSISTENT_STATE)?.jwt ?? null

};

export const login = createAsyncThunk('user/login', 
	async(params: {email: string, password: string}) => {
		try{
			const {data} = await axios.post<LoginResponce>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch(e){
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			}
		}
	}
);


export const getProfile = createAsyncThunk<Profile, void, {state :RootState} >('user/getProfile', 
	async(_, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt;
		const {data} = await axios.post<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data;

	}
);




export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		}
	},
	extraReducers:(builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload){
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action)=> {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action)=> {
			state.profile = action.payload;
		});

	}
});


export default userSlice.reducer;
export const userActions = userSlice.actions;