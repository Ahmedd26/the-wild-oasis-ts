import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow, { StyledFormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const { user } = useUser();
    const email = user?.email ?? "";
    const currentFullName = user?.user_metadata?.fullName ?? "";
    const { updateUser, isUpdating } = useUpdateUser();
    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState<File | null>(null);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!fullName) return;
        updateUser(
            { fullName, avatar },
            {
                onSuccess: () => {
                    setAvatar(null);
                    (e.target as HTMLFormElement).reset();
                },
            }
        );
    }

    function handleCancel() {
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name">
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="fullName"
                    disabled={isUpdating}
                />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput
                    id="avatar"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files) {
                            setAvatar(e.target.files[0]);
                        }
                    }}
                    disabled={isUpdating}
                />
            </FormRow>
            <StyledFormRow>
                <Button
                    type="reset"
                    disabled={isUpdating}
                    variation="secondary"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                    Update account
                </Button>
            </StyledFormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
