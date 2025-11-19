import { Avatar, Badge, DropdownMenu } from "@radix-ui/themes";
import { BiLogOut } from "react-icons/bi";
import ConfirmDialog from "./shared/ConfirmDialog";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const AvatarDropDownMenu = ({ userInfo }) => {

    const { dispatch } = useAuthContext();

    const onLogout = () => {
        toast.error(`You’ve been logged out, '${userInfo?.user_data?.username}'😶`);
        dispatch({
            type: 'LOGOUT'
        });

        sessionStorage.removeItem(process.env.REACT_APP_SESSIONSTORAGE_KEYNAME);
    };


    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar src="https://avatar.iran.liara.run/public/41" loading="lazy" fallback='RK' size='2' />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <p className="text-md leading-2 font-semibold">Namaste, {userInfo?.user_data?.username || <span className='text-red-500'>Didn't get!</span>}</p>
                </DropdownMenu.Label>
                {userInfo?.user_data?.isGuest && <DropdownMenu.Label><Badge color="green">Guest</Badge></DropdownMenu.Label>}
                <DropdownMenu.Item>Settings</DropdownMenu.Item>
                <DropdownMenu.Separator />

                {/* using a confirmdialog for logout */}
                <ConfirmDialog
                    trigger={<DropdownMenu.Item color="red" onSelect={(e) => e.preventDefault()}>Logout <BiLogOut size={20} /> </DropdownMenu.Item>}
                    onConfirm={onLogout}
                    title="Confirm Logout"
                    description="Are you sure you want to logout?"
                    confirmText="Logout"
                    cancelText="Cancel" />

            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default AvatarDropDownMenu;