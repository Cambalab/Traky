import { getPlatforms } from "@ionic/react";

export function isMobile() {
  if (getPlatforms().includes("mobile")) {
    return true;
  }
}
