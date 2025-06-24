const { z } = require("zod");

//CREATING OBJECT SCHEMEA
const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is require" })
        .trim()
        .min(3, { message: "Name must be at least of 3 char." })
        .max(255, { message: "Name must not be more then 255 char." }),

    email: z
        .string({ required_error: "Email is require" })
        .trim()
        .email({ message: "Inavalid email address" })
        .min(3, { message: "Email must be at least of 3 char." })
        .max(255, { message: "Email must not be more then 255 char." }),

    phone: z
        .string({ required_error: "Phone Number is require" })
        .trim()
        .min(10, { message: "Phone Number must be at least of 10 char." })
        .max(20, { message: "Phone Number must not be more then 20 char." }),

    password: z
        .string({ required_error: "Password is require" })
        .trim()
        .min(6, { message: "Password must be at least of 6 char." })
        .max(100, { message: "Password must not be more then 100 char." }),
});

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is require" })
        .trim()
        .email({ message: "Inavalid email address" }),

    password: z
        .string({ required_error: "Password is require" })
        .trim(),
});

module.exports = { signupSchema, loginSchema };
