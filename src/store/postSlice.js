import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = { records: [], loading: false ,error: null,record: null };

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_,thunkAPI) => {
        
        const { rejectWithValue } = thunkAPI;

        try {

            const res = await fetch("http://localhost:5000/posts");
            const data = await res.json();
            return data;
            
        }
        catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const fetchPost = createAsyncThunk(
    "post/fetchPost",
    async (id,thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            const res = await fetch(`http://localhost:5000/posts/${id}`);
            const data = await  res.json();
            return data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id,thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            await fetch(`http://localhost:5000/posts/${id}`,{
                method: "DELETE"
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const insertPost = createAsyncThunk(
    "posts/insertPost",
    async (item,thunkAPI) => {
        const { rejectWithValue,getState } = thunkAPI;
        const { auth } = getState();
        item.userId = auth.id;

        try {
            const res = await fetch(`http://localhost:5000/posts`,{
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
);

export const editPost = createAsyncThunk(
    "posts/editPost",
    async (item,thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        console.log(item)
        
        try {
            const res = await fetch(`http://localhost:5000/posts/${item.id}`,{
                method: "PATCH",
                body: JSON.stringify(item),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },
    extraReducers: (builder) => {

        // fetch post

        builder.addCase(fetchPost.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })

          builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //fetch posts

        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })

          builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //create posts

        builder.addCase(insertPost.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(insertPost.fulfilled, (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        })

          builder.addCase(insertPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //delete posts

        builder.addCase(deletePost.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter(e => e.id !== action.payload);
        })

          builder.addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //edit posts

        builder.addCase(editPost.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        builder.addCase(editPost.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
        })

        builder.addCase(editPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
    },
});

export const { cleanRecord } = postSlice.actions;
export default postSlice.reducer;