import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {

        console.log(data);
        const url = `http://localhost:5000/service`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'

            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })

    };
    return (
        <div className='w-50 mx-auto'>
            <h1>Please add a service</h1>
            <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='name' {...register("name", { required: true, maxLength: 20 })} /> <br />
                <textarea placeholder='description' {...register("description")} /><br />
                <input placeholder='price' type="number" {...register("price")} /> <br />
                <input placeholder='Photo URL' type="text" {...register("img")} /> <br />
                <input type="submit" value="Add Service" />
            </form>
        </div>
    );
};

export default AddService;