## popover
<Popover.Content css={{ "--popover-bg": "lightblue" }}>
semble ne pas avoir d'option pour s'ouvrir au survol

custom arrow color
const bgResolved = useColorModeValue("#FFFFFF", "#232323");
<Popover.Arrow >
<Popover.ArrowTip css={{background: bgResolved + "!important"}}/>
</Popover.Arrow>
mais n'est pas très esthétique