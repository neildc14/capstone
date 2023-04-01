import { UilBell } from "@iconscout/react-unicons";
import { Tooltip, IconButton } from "@chakra-ui/react";

const NotifBell = () => {
  return (
    <Tooltip label="Notifications">
      <IconButton
        variant="ghost"
        borderRadius={0}
        _hover={{ bgColor: "none" }}
        icon={<UilBell boxSize={5} color="#ff7a00" />}
      />
    </Tooltip>
  );
};

export default NotifBell;
