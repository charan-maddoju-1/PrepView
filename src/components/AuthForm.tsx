"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form" 
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"

import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"




const authFormSchema=(type:FormType)=>{
  return z.object({
  name: type==='sign-up'? z.string().min(3).max(50):z.string(),
  email:z.string().email(),
  password:z.string().min(3),

})
}

const AuthForm = ({type}:{type:FormType}) => {
  const router=useRouter();
  const formSchema=authFormSchema(type);
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form submitted:", values);
    try{
      if(type==="sign-up"){
        toast.success("Account created Successfully. Please Sign in.");
        router.push("/sign-in")
      }
      else{
        toast.success("Signed in Successfully");
        router.push("/")
      }

    }catch(err){
      console.log(err);
      toast.error(`There was an error: ${err}`)
    }
    console.log(values)
  }

  const isSignin=type==='sign-in'
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepView</h2>
        </div>

        <h3>Prepare for Interviews with AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignin&&
            <FormField control={form.control} name="name" label="name" placeholder="Your name"/>}

            <FormField control={form.control} name="email" label="email" type="email" placeholder="Enter your email address"/>
            <FormField control={form.control} name="password" label="name" placeholder="Enter your passowrd" type="password"/>
            <Button className="btn" type="submit">{isSignin?"Sign in":"Sign Up"}</Button>
          </form>
        </Form>
        <p className="text-center ">{isSignin?"No Account Yet? ":"Already Have an Account? "}<Link href={!isSignin?"/sign-in":"/sign-up"} className="font-bold text-user-primary ml-1">{isSignin?"Sign up":"Sign in"} </Link></p>
      </div>
    </div>
  );
}

export default AuthForm
