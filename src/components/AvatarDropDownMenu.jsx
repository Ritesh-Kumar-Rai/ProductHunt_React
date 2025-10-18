import { Avatar, Badge, DropdownMenu } from "@radix-ui/themes";
import { BiLogOut } from "react-icons/bi";

const AvatarDropDownMenu = ({ userInfo }) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar src="https://avatar.iran.liara.run/public/41" fallback='RK' size='2' />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <p className="text-md leading-2 font-semibold">Namaste, {userInfo?.user_data?.username || <span className='text-red-500'>Didn't get!</span>}</p>
                </DropdownMenu.Label>
                {userInfo?.user_data?.isGuest && <DropdownMenu.Label><Badge color="green">Guest</Badge></DropdownMenu.Label>}
                <DropdownMenu.Item>Settings</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item color="red">Logout <BiLogOut size={20} /> </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default AvatarDropDownMenu;