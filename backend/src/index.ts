import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog';

const app = new Hono()

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
