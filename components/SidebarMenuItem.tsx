interface Props {
  text: string;
  Icon: any;
  active?: boolean;
}
export const SidebarMenuItemComponent: React.FC<Props> = ({
  text,
  Icon,
  active,
}) => {
  return (
    <div className="hover-effects flex items-center text-gray-600 justify-center xl:justify-start text-lg space-x-3">
      <Icon className="h-7" />
      <span className={`${active && 'font-bold'} hidden xl:inline-block`}>
        {text}
      </span>
    </div>
  );
};
