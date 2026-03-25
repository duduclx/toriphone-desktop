import Main from "../components/main/Main";

import PhoneIncoming from "../components/notifications/PhoneIncoming";
import PhoneSignal from "../components/notifications/PhoneSignal";
import MeetingAuthorization from "../components/notifications/MeetingAuthorization";
import PhoneSoundCalling from "../components/sounds/PhoneSoundCalling";
import PhoneSounds from "../components/sounds/PhoneSounds";
import Pickup from "../components/pickup/Pickup";

import { WazoProvider } from "../services/WazoProvider";

// toaster
import { Toaster } from "../components/ui/toaster";

function Layout() {
  return (
    <WazoProvider>
      <PhoneSounds />
      <PhoneSoundCalling />
      <PhoneIncoming />
      <MeetingAuthorization />
      <PhoneSignal />
      <Pickup />
      <Main />
      <Toaster />
    </WazoProvider>
  );
}

export default Layout;
