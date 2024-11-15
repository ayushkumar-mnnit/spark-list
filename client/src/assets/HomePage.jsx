
// import { TabList, TabPanel, TabPanels, Tabs, Tab} from '@chakra-ui/react'
import { TabList, TabPanel, TabPanels, Tabs, Tab, Heading, Text, Box, Switch } from "@chakra-ui/react";
import { AiOutlineSun } from "react-icons/ai";
import { IoMoonSharp } from "react-icons/io5";

import {Upcoming} from './Upcoming.jsx'
import {Overdue} from './Overdue.jsx'
import {Completed} from './Completed.jsx'
import { useAuth } from "./context/ContextApi.jsx";



export const HomePage = () => {   
    
    const {handleToggle, toggle,langToggle, handleLangToggle} = useAuth();

    if(toggle){
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
    }else{
        document.body.style.backgroundColor = "white"
        document.body.style.color = "black"
    }



    return (
        <>

<Box display="flex" justifyContent="space-between"  mt="1%" ml={"2%"} alignItems={"center"} >

<Heading textAlign="center" color="orangered" fontFamily="monospace" fontSize="25px">
    Spark
    <Text as="span" color="purple.600" fontSize="22px">
        List
    </Text>
</Heading>

<Box gap={"10px"} display={"flex"} mr={"4%"} >


<Switch display={"flex"}  fontSize={"14px"} alignItems={"center"} onChange={handleLangToggle} >
{!langToggle ?  'English': 'हिन्दी'}
</Switch>

<Switch color='black' mr={"4%"} display={"flex"} onChange={handleToggle} >
{toggle ?  <IoMoonSharp color="yellow" size={'18px'}/> : <AiOutlineSun color="orangered" size={'20px'} />}
</Switch>

</Box>


</Box>
            <Tabs  p='10px'>
                <TabList>
                    <Tab  color={toggle ? "cyan" : "purple"}> {langToggle ? "आगामी कार्य":"Upcoming Tasks"}</Tab>
                    <Tab color={toggle ? "cyan" : "purple"}>{langToggle ? "विलंबित कार्य":"Overdue Tasks"}</Tab>
                    <Tab color={toggle ? "cyan" : "purple"}>{langToggle ? "पूर्ण कार्य":"Completed Tasks"}</Tab>
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


