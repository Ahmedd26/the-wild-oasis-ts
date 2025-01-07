import { useForm } from "react-hook-form";
import { type ICabinRes, type ICabin } from "../../types/cabin.interface";
import FormRow, { StyledFormRow } from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface Props {
    cabinToEdit?: ICabinRes;
    onCloseModal?: () => void;
}

function CreateCabinForm({ cabinToEdit, onCloseModal }: Props) {
    const { createCabin, isCreating } = useCreateCabin();
    const { editCabin, isEditing } = useEditCabin();
    const isWorking = isCreating || isEditing;

    const { id: editId, ...editValues } = cabinToEdit ?? {};
    const isEditSession = Boolean(editId);
    type formData = Omit<ICabin, "image"> & { image: FileList };
    const { register, handleSubmit, reset, getValues, formState } =
        useForm<formData>({
            defaultValues: isEditSession ? editValues : {},
        });
    const { errors } = formState;

    function onSubmit(data: formData) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession && editId !== undefined)
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        else
            createCabin(
                { ...data, image },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    disabled={isWorking}
                    type="text"
                    id="name"
                    {...register("name", {
                        required: "This field is required.",
                    })}
                />
            </FormRow>
            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    disabled={isWorking}
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
                error={errors?.regularPrice?.message}
            >
                <Input
                    disabled={isWorking}
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
            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    disabled={isWorking}
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
                error={errors?.description?.message}
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
            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "Please select a photo for the cabin.",
                    })}
                />
            </FormRow>
            <StyledFormRow>
                {/* type is an HTML attribute! */}
                <Button
                    variation="secondary"
                    type="reset"
                    // Since onCloseModal is optional
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit cabin" : "Create new cabin"}
                </Button>
            </StyledFormRow>
        </Form>
    );
}

export default CreateCabinForm;
