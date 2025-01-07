import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow, { StyledFormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/
export interface SignupFormData {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm?: string;
}

function SignupForm() {
    const { register, formState, getValues, handleSubmit, reset } =
        useForm<SignupFormData>();
    const { errors } = formState;
    const { signup, isLoading } = useSignup();
    function onSubmit({ fullName, email, password }: SignupFormData) {
        signup(
            { fullName, email, password },
            {
                onSettled: () => reset(),
            }
        );
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow
                label="Full name"
                error={errors?.fullName?.message?.toString()}
            >
                <Input
                    disabled={isLoading}
                    type="text"
                    id="fullName"
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Email address"
                error={errors?.email?.message?.toString()}
            >
                <Input
                    disabled={isLoading}
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please enter a valid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message?.toString()}
            >
                <Input
                    disabled={isLoading}
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message?.toString()}
            >
                <Input
                    disabled={isLoading}
                    type="password"
                    id="passwordConfirm"
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords need to match",
                    })}
                />
            </FormRow>

            <StyledFormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </StyledFormRow>
        </Form>
    );
}

export default SignupForm;
