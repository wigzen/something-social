import { Button, Card, Textarea } from '@mantine/core'
const AddPost = () => {
  return (
    <Card className=" max-w-lg my-1">
      <Textarea placeholder="How was your day ?" />
      <div className=" flex ">
        <Button variant="filled" className="bg-sky-500 mt-1  ml-auto">
          Post
        </Button>
      </div>
    </Card>
  )
}

export default AddPost
