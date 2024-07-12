import { Hono } from "hono";
import {sign, verify} from 'hono/jwt'
import {PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'
import {signinInput, signupInput} from '@neom009/medium-common'

export const userRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
      }
}>();
  
  userRouter.post('/signup', async(c) => {
    const prisma =new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body=await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({error:'Invalid input.'});
    }

    try{
  
      const user=await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
        }
      })
  
      const token=await sign({id:user.id},c.env.JWT_SECRET)
      // console.log(token)
    
      return c.json({
        jwt:token
      })
  
    }catch(err){
      c.status(411);
      return c.text("User already exists with the email!");
    }
  
  })
  
  userRouter.post('/signin', async(c) => {
    const prisma =new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body=await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({error:'Invalid input.'});
    }

    try{
      const user=await prisma.user.findFirst({
        where:{
          email:body.email,
          password:body.password
        }
      })
    
      if(!user){
        c.status(403)
        return c.json({
          error:"Inavlid Creds"
        })
      }
    
      const jwt=await sign({id:user.id},c.env.JWT_SECRET)
    
      return c.json({
        jwt
      })
  
    }catch(err){
      c.status(411);
      return c.text("Invalid");
    }
  
  })