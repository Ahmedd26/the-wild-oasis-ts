import { SignupFormData } from "../features/authentication/SignupForm";
import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }: SignupFormData) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });
    if (error) throw new Error(error.message);
    return data;
}

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw new Error(error.message);
    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

// interface userUpdate {
//     password?: string;
//     fullName?: string;
//     avatar?: File | null;
// }
// export async function updateCurrentUser({
//     password,
//     fullName,
//     avatar,
// }: userUpdate) {
//     // 1. Update password OR fullName
//     let updateData;
//     if (password) updateData = { password };
//     if (fullName) updateData = { data: { fullName } };
//     const { data, error } = await supabase.auth.updateUser(updateData);
//     if (error) throw new Error(error.message);
//     if (!avatar) return data;
//     // 2. Upload the avatar image
//     const fileName = `avatar=${data.user.id}-${Math.random()}`;
//     const { error: storageError } = await supabase.storage
//         .from("avatars")
//         .upload(fileName, avatar);
//     if (storageError) throw new Error(storageError.message);

//     // 3. Update avatar image in user metadata
//     const { data: updatedUser, error: updatedError } =
//         await supabase.auth.updateUser({
//             data: {
//                 avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
//             },
//         });
//     if (updatedError) throw new Error(updatedError.message);
//     return updatedUser;
// }
interface userUpdate {
    password?: string;
    fullName?: string;
    avatar?: File | null;
}

export async function updateCurrentUser({
    password,
    fullName,
    avatar,
}: userUpdate) {
    // 1. Update password
    if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({
            password,
        });
        if (passwordError) throw new Error(passwordError.message);
    }

    // 2. Update fullName
    if (fullName) {
        const { error: fullNameError } = await supabase.auth.updateUser({
            data: { fullName },
        });
        if (fullNameError) throw new Error(fullNameError.message);
    }

    // 3. Return early if no avatar to update
    if (!avatar) {
        const { data: updatedData, error: updateError } =
            await supabase.auth.getUser();
        if (updateError) throw new Error(updateError.message);
        return updatedData;
    }

    // 4. Upload the avatar image
    const { data, error: userDataError } = await supabase.auth.getUser();
    if (userDataError) throw new Error(userDataError.message);

    const fileName = `avatar=${data.user.id}-${Math.random()}`;
    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);
    if (storageError) throw new Error(storageError.message);

    // 5. Update avatar image in user metadata
    const { data: updatedUser, error: avatarUpdateError } =
        await supabase.auth.updateUser({
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        });
    if (avatarUpdateError) throw new Error(avatarUpdateError.message);

    return updatedUser;
}
