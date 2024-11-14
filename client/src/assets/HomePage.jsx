
// import { TabList, TabPanel, TabPanels, Tabs, Tab} from '@chakra-ui/react'
import { TabList, TabPanel, TabPanels, Tabs, Tab, Heading, Text, Box } from "@chakra-ui/react";

import {Upcoming} from './Upcoming.jsx'
import {Overdue} from './Overdue.jsx'
import {Completed} from './Completed.jsx'



export const HomePage = () => {


    return (
        <>

<Box display="flex" justifyContent="left"  mt="1%" ml={"2%"} >

<Heading textAlign="center" color="orangered" fontFamily="monospace" fontSize="25px">
    Spark
    <Text as="span" color="purple.600" fontSize="22px">
        List
    </Text>
</Heading>

</Box>



        
            <Tabs  p='10px'>
                <TabList>
                    <Tab color='purple'>Upcoming Tasks</Tab>
                    <Tab color='purple'>Overdue Tasks</Tab>
                    <Tab color='purple'>Completed Tasks</Tab>
                </TabList>
                
                <TabPanels >
                   
                    <TabPanel>
                        <Upcoming />
                    </TabPanel>

                    <TabPanel>
                        <Overdue/>
                    </TabPanel>

                    <TabPanel>
                        <Completed/>
                    </TabPanel>
                  
                </TabPanels>
            </Tabs>
        </>
    )
}


