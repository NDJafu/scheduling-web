import { enviromentKeys } from "@/constants/enviroment";
import { generateUploadButton } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
  url: `${enviromentKeys.API_URL}/uploadthing`,
});
