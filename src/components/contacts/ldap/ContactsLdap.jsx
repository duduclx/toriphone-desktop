import { useEffect } from 'react';
import { Flex, Text, Separator } from '@chakra-ui/react'

import { useWazo } from "../../../services/WazoProvider";

const ContactsLdap = () => {

    // api
    const { contactsLdapGet, contactsLdap } = useWazo();

    useEffect(() => {
        // contactsLdapGet();
    }, []);

    console.log("contactsLdap", contactsLdap)

  return (
    <Flex flexDirection="column" height="calc(100vh - 64px)" flex="1" p="2" >
        <Text p="2" as='b' fontSize='3xl'>LDAP</Text>
        <Separator />
    </Flex>
  )
}

export default ContactsLdap
