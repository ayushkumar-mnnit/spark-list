
// import { TabList, TabPanel, TabPanels, Tabs, Tab} from '@chakra-ui/react'
import { TabList, TabPanel, TabPanels, Tabs, Tab, Heading, Text } from "@chakra-ui/react";

import {Upcoming} from './Upcoming.jsx'
import {Overdue} from './Overdue.jsx'
import {Completed} from './Completed.jsx'



export const HomePage = () => {


    return (
        <>

<Heading textAlign="center" color="orangered" fontFamily="monospace" fontSize="30px" mt="1%">
    Spark
    <Text as="span" color="green" fontSize="25px">
        List
    </Text>
</Heading>

        
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


