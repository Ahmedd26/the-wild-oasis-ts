import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../types/queryKey";
import { createCabin } from "../../services/apiCabins";
import { useForm } from "react-hook-form";
import { type ICabin } from "../../types/cabin.interface";
import FormRow, { StyledFormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";

function CreateCabinForm() {
    type formData = Omit<ICabin, "image"> & { image: FileList };
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, getValues, formState } =
        useForm<formData>();
    const { errors } = formState;
    const { mutate, isLoading: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: [queryKeys.CABINS] });
            reset();
        },
        onError: (error: Error) => toast.error(error.message),
    });
    function onSubmit(data: formData) {
        mutate({ ...data, image: data.image[0] });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin name" errors={errors?.name?.message}>
                <Input
                    disabled={isCreating}
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required.",
                    })}
                />
            </FormRow>
            <FormRow
                label="Maximum capacity"
                errors={errors?.maxCapacity?.message}
            >
                <Input
                    disabled={isCreating}
                    type="number"
                    id="maxCapacity"
                    {...register("maxCapacity", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Capacity must be at least 1.",
                        },
                    })}
                />
            </FormRow>
            <FormRow
                label="Regular price"
                errors={errors?.regularPrice?.message}
            >
                <Input
                    disabled={isCreating}
                    type="number"
                    id="regularPrice"
                    {...register("regularPrice", {
                        required: "This field is required.",
                        min: {
                            value: 1,
                            message: "Capacity must be at least 1.",
                        },
                    })}
                />
            </FormRow>
            <FormRow label="Discount" errors={errors?.discount?.message}>
                <Input
                    disabled={isCreating}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required.",
                        validate: (value) =>
                            Number(value) <= Number(getValues().regularPrice) ||
                            "Discount should be less than or equal to the regular price",
                    })}
                />
            </FormRow>
            <FormRow
                label="Description for website"
                errors={errors?.description?.message}
            >
                <Textarea
                    id="description"
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required.",
                    })}
                />
                {/* <Textarea type="number" id="description" defaultValue="" /> */}
            </FormRow>
            <FormRow label="Cabin photo" errors={errors?.image?.message}>
                <FileInput id="image" accept="image/*" {...register("image")} />
            </FormRow>
            <StyledFormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </StyledFormRow>
        </Form>
    );
}

export default CreateCabinForm;
