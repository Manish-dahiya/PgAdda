import { decodeToken } from "@/helper/helper";

const { createAsyncThunk, createSlice, current } = require("@reduxjs/toolkit")

const initialState = {
    user: {
        data: typeof window != "undefined" && JSON.parse(localStorage.getItem("user")) ? decodeToken(JSON.parse(localStorage.getItem("user"))) : null,
        status: "idle",
        error: null
    },
    emailData: {
        response: "Idle",
        status: "idle",
        error: null
    }
}

export const loginUser = createAsyncThunk(
    "userSlice/loginUser",
    async (formData, { rejectWithValue }) => {
        const res = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    }
);

export const registerUser = createAsyncThunk(
    "userSlice/registerUser",
    async (formData) => {
        const res = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        return res.json();
    }
)


export const sendEmail = createAsyncThunk(
    "userSlice/sendEmail",
    async (formData) => {
        const res = await fetch("/api/user/emailOwner", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        return res.json();
    }
)

// ── Update user profile (multipart/form-data for avatar support) ─────────────
export const updateUser = createAsyncThunk(
    "userSlice/updateUser",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            // NOTE: Do NOT set Content-Type manually — the browser sets it
            // automatically with the correct multipart boundary for FormData.
            const res = await fetch(`/api/owner/${id}`, {
                method: "PUT",
                body: formData,
            })
            const data = await res.json()
            if (!data.success) return rejectWithValue(data.response)
            return data   // { success: true, data: updatedUser }
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchUser = createAsyncThunk(
    "userSlice/fetchUser",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/owner/${id}`)
            const data = await res.json()
            if (!data.success) return rejectWithValue(data.response)
            return data  // { success: true, data: updatedUser }
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)


const userSlice = createSlice({
    initialState,
    name: "userSlice",
    reducers: {
        logoutUser: (state) => {
            state.user.data = null;
            state.user.status = "idle";
            state.user.error = null;

            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
            }

        },
        // Reset update status so the modal can be reopened cleanly
        resetUpdateStatus: (state) => {
            state.updateStatus = "idle"
            state.updateError = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.user.status = "pending"

            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.success == false) {
                    state.user.error = action.payload.response //message from api
                    state.user.status = "failed"

                }
                else {
                    state.user.status = "success"
                    state.user.error = null
                    let token = JSON.stringify(action.payload.response)
                    localStorage.setItem("user", token)
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user.status = "rejected";
                console.log("got again rejected")
                state.user.error = action.error.message || "An error occurred during login.";
            })
            .addCase(registerUser.pending, (state, action) => {
                state.user.status = "pending"

            })
            .addCase(registerUser.fulfilled, (state, action) => {
                if (action.payload.success == false) {
                    state.user.error = action.payload.response //message from api
                    state.user.status = "failed"

                }
                else {
                    state.user.status = "success"
                    state.user.error = null
                    let token = JSON.stringify(action.payload.response)
                    if (typeof window != "undefined") {
                        localStorage.setItem("user", token)
                    }
                    // state.user.data=decodeToken(JSON.parse(localStorage.getItem("user")))
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.user.status = "rejected"
                // state.error=action.payload.response || "An error occurred during login.";
            })
            .addCase(sendEmail.pending, (state) => {
                state.emailData.status = "pending"
                state.emailData.response = "processing"
            })
            .addCase(sendEmail.fulfilled, (state, action) => {
                if (action.payload.success == false) {
                    state.emailData.status = "failed"
                    state.emailData.response = "error in sending email"
                } else {
                    state.emailData.response = action.payload.response
                    state.emailData.status = "success"
                    console.log(action.payload.response)
                }
            })
            // ── updateUser ─────────────────────────────────────────────────────
            .addCase(updateUser.pending, (state) => {
                state.updateStatus = "pending"
                state.updateError = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateStatus = "success"
                state.updateError = null
                // Merge updated fields into the in-memory user so the UI
                // reflects changes immediately without a page refresh.
                if (state.user.data) {
                    state.user.data = {
                        ...state.user.data,
                        ...action.payload.data,
                    }
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateStatus = "failed"
                state.updateError = action.payload || "Failed to update profile"
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                if (state.user.data) {
                    state.user.data = {
                        ...state.user.data,   // keep _id, role, token-derived fields
                        ...action.payload.data, // overwrite with fresh DB values
                    }
                }
            })
    }
})

export const { logoutUser, resetUpdateStatus } = userSlice.actions;

export default userSlice.reducer
