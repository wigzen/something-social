import { Card, Avatar, Pagination, Paper, Menu, Button } from '@mantine/core'
import { BiComment } from 'react-icons/bi'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import {
  BsBookmark,
  BsChatLeft,
  BsHeart,
  BsShare,
  BsThreeDotsVertical,
} from 'react-icons/bs'
const Post = () => {
  return (
    <Card className="flex max-w-lg">
      <Avatar color="cyan" radius="xl">
        MK
      </Avatar>
      <div className="w-full px-2 ">
        <div className="flex items-center justify-between">
          <p className=" text-start">
            <b className=" text-lg">Tanay Pratap</b>
            <span> @tanaypratap</span>
          </p>
          <Menu withArrow shadow="md" width={100}>
            <Menu.Target>
              <button>
                <BsThreeDotsVertical size={20} withArrow />
              </button>
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Label>Application</Menu.Label> */}
              <Menu.Item>Edit</Menu.Item>
              <Menu.Item>Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        <div className="w-full my-2">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
            cumque odit ab sequi modi eligendi earum, atque alias vitae illum
            obcaecati molestiae enim itaque in impedit distinctio recusandae
            sapiente natus doloribus praesentium dolorum provident, consectetur
            eveniet animi. Quam, sed in.
          </p>
        </div>
        <div className="flex justify-between w-full">
          <button>
            <BsHeart size={20} />
          </button>
          <button>
            <BsChatLeft size={20} />
          </button>
          <button>
            <BsBookmark size={20} />
          </button>
          <button>
            <BsShare size={20} />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default Post
