import {
    Box,      
    Text,     
    Badge,  
    Image   
  } from '@chakra-ui/react'

  const getBadgeColor = (status) => {
    if(status === 'read') return 'green'
    if(status === 'reading') return 'orange'
    if(status === 'want_to_read') return 'purple'
    return 'gray'
  }

 function BookCard ({title, author, status, cover_url}){
  return (

    <Box border="1px" borderColor="gray.200" 
         borderRadius="xl" overflow="hidden">


         {cover_url
            ?<Image src = {cover_url} h="150px" w="100%" objectFit="cover"/>
            : <Box h="150px" bg="gray.100" display="flex" 
                    alignItems="center" justifyContent="center">
                <Text fontSize="40px">📚</Text>
              </Box>
         }   
         

         <Box p={4}>
            <Text fontWeight="bold" >{title}</Text>
            <Text color="gray.500" fontSize="sm">{author}</Text>
            <Badge mt={2} colorScheme={getBadgeColor(status)}>{status}</Badge>
         </Box>
    </Box>




  )
}

export default BookCard