import { api } from "@/trpc/server";
import { PropertiesCard } from "./properties-card";
import { BusinessInfoCard } from "./business-info-card";
import { NotificationsCard } from "./notifications-card";
import { AddressCard } from "./address-card";
import { SubmitBundle } from "./review-bundle";

export default async function BundleDetails({
  params,
}: {
  params: { sid: string };
}) {
  const bundle = await api.bundle.getBundle(params.sid);
  const regulation = await api.regulation.getRegulation(bundle.regulationSid);
  const itemAssignments = await bundle.itemAssignments().list();

  const endUserSid = itemAssignments
    .filter((itemAssignment) => itemAssignment.objectSid.startsWith("IT"))
    .map((itemAssignment) => itemAssignment.objectSid)[0];
  const endUser = endUserSid ? await api.endUser.getEndUser(endUserSid) : null;

  const addressSupportingDocSid = itemAssignments
    .filter((itemAssignment) => itemAssignment.objectSid.startsWith("RD"))
    .map((itemAssignment) => itemAssignment.objectSid)[0];

  const addressSupportingDocument = addressSupportingDocSid
    ? await api.supportingDocument.getSupportingDocument(
        addressSupportingDocSid,
      )
    : null;

  const address = addressSupportingDocument
    ? await api.address.getAddress(
        addressSupportingDocument.attributes.address_sids[0] as string,
      )
    : null;

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">{bundle.friendlyName}</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
        <div className="grid gap-6">
          <PropertiesCard
            bundle_sid={bundle.sid}
            friendlyName={bundle.friendlyName}
            isoCountry={regulation.isoCountry}
            numberType={regulation.numberType}
            validUntil={bundle.validUntil}
            endUserType={regulation.endUserType}
          />
          <BusinessInfoCard bundleSid={bundle.sid} endUser={endUser} />
          <AddressCard bundleSid={bundle.sid} address={address} />
          <NotificationsCard
            bundleSid={bundle.sid}
            email={bundle.email}
            statusCallback={bundle.statusCallback}
          />
        </div>
        <SubmitBundle
          bundleSid={bundle.sid}
          disable={bundle.status !== "draft" || !endUser || !address}
        />
      </div>
    </>
  );
}
