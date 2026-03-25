import { Flex, Text, Separator } from '@chakra-ui/react'

const ContactsOffice = () => {

  return (
    <Flex flexDirection="column" height="calc(100vh - 64px)" flex="1" p="2">
        <Text p="2" as='b' fontSize='3xl'>office</Text>
        <Separator />
    </Flex>
  )
}

export default ContactsOffice