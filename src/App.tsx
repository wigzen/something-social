import { useEffect, useState, useContext } from 'react'
import { db } from './config/firebase'
import { collection, getDocs } from '@firebase/firestore'
import './App.css'
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Space,
  Paper,
  Button,
  Box,
  Avatar,
  TextInput,
  Autocomplete,
} from '@mantine/core'
import { AuthContext } from './context/AuthProvider'
import { PostContext } from './context/PostProvider'
import { UserContext } from './context/UserProvider'
import { Route, Routes } from 'react-router-dom'
import { AddPost, Post } from './components'

function App() {
  const { islogedin, userData, signupDetails, loginDetails }: any =
    useContext(AuthContext)

  const { post }: any = useContext(PostContext)
  const { userTask }: any = useContext(UserContext)
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  console.log({
    islogedin,
    userData,
    signupDetails,
    loginDetails,
    post,
    userTask,
  })
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 400 }}
          className="flex  flex-col items-center"
        >
          <Paper p="xs" className="bg-sky-500 my-1 w-10/12  text-white">
            Home
          </Paper>
          <Paper p="xs" className="bg-sky-500 my-1 w-10/12 text-white">
            Explore
          </Paper>
          <Paper p="xs" className="bg-sky-500 my-1 w-10/12 text-white">
            Bookmark
          </Paper>
          <Paper p="xs" className="bg-sky-500 my-1 w-10/12 text-white">
            Profile
          </Paper>
          <Space />
          <Button variant="filled" className="bg-sky-500 my-1 w-10/12 ">
            Create New Post
          </Button>
          <Paper className=" bg-slate-500  py-2 px-1 flex gap-1 items-center  w-10/12 ">
            <Box>
              <Avatar color="cyan" radius="xl">
                TP
              </Avatar>
            </Box>
            <Box className="bg-slate-500 ">
              <Text>Tanay Pratap</Text>
              <Text fz={'xs'}>@tanaypratap</Text>
            </Box>
          </Paper>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 400 }}>
            <Autocomplete
              placeholder="Search friends"
              data={['React', 'Angular', 'Svelte', 'Vue']}
            />{' '}
            <Paper>HELLO</Paper>
          </Aside>
        </MediaQuery>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text fz={'lg'}>Stoic</Text>
          </div>
        </Header>
      }
    >
      <Text>POSTs</Text>
      <AddPost />
      <Post />
      <Routes>
        <Route path="/" />
      </Routes>
    </AppShell>
  )
}

export default App
