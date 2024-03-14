import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Image, ImageBackground, ScrollView, TouchableOpacity, View, SafeAreaView } from "react-native";
import { colors, fonts, textStyles } from "~/constants/designConstants";
import { useIOS } from "~/helpers/useIOS";
import { useHebrew } from "~/i18n";
import { ContactInterface } from "~/models/contacts";
import Text from "~/view/components/Text";
import TextInput from "~/view/components/TextInput";
import { styles } from "../styles";
import Contacts from "react-native-contacts";

import UserIcon from "~/view/assets/icons/user.svg";
import PrimaryButton from "~/view/components/PrimaryButton";
import { verticalScale } from "~/constants/metrics";
import ArrowBackIcon from "~/view/assets/icons/arrow-back.svg";
import { status, userRoles } from "~/constants/main";
import InviteStatusModal from "./InviteStatusModal";
import { useAppSelector } from "~/store/hooks";
import { Parent } from "~/services/Parent";
import { useNavigation } from "@react-navigation/native";
import { Child } from "~/services/Child";

const Invite: React.FC = () => {
  const [contacts, setContacts] = useState<ContactInterface[] | null>(null);
  const [noAccess, setNoAccess] = useState<boolean>(false);
  const [noMatches, setNoMatches] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const [inviteStatus, setInviteStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<ContactInterface | null>(null);

  const userRole = useAppSelector((state) => state.user.user.role);

  const isIOS = useIOS();
  const { t } = useTranslation();
  const isHebrew = useHebrew();

  const navigation = useNavigation();

  useEffect(() => {
    if (Contacts) {
      Contacts.getAll().then((contacts) => {
        setContacts(contacts);
        setNoAccess(false);
      });
    } else {
      setNoAccess(true);
    }
  }, []);

  useEffect(() => {
    setNoMatches(false);
    if (searchValue.length > 0) {
      const filteredContacts = contacts?.filter((item) => item.familyName.toLowerCase().includes(searchValue.toLowerCase()) || item.givenName.toLowerCase().includes(searchValue.toLowerCase()));
      if (filteredContacts && !filteredContacts?.length) {
        setNoMatches(true);
      } else {
        setContacts(filteredContacts);
      }
    } else {
      Contacts.getAll().then((contacts) => {
        setContacts(contacts);
      });
    }
  }, [searchValue]);

  const invite = async () => {
    const cleanPhone = (phone) => phone.replace(/[^0-9]+/g, "");
    const phone = "+9725" + cleanPhone(selectedUser?.phoneNumbers[0].number).slice(2);

    const navigationAction = (response) => {
      navigation.navigate(response.message === "code sent" ? "EnterInviteCode" : "InvitationSend");
    };

    const roleActions = {
      [userRoles.parent]: Parent.inviteChild,
      [userRoles.child]: Child.inviteParent,
    };

    if (roleActions[userRole]) {
      const response = await roleActions[userRole](phone);
      navigationAction(response);
    } else {
      console.error("Invalid user role");
    }
  };

  const handleModal = (status: string) => {
    setInviteStatus(status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (inviteStatus === status.success) {
      setIsModalOpen(false);
      navigation.goBack();
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <ImageBackground source={require("~/view/assets/images/backgrounds/2.1.png")}>
      <View style={styles.container}>
        <SafeAreaView />
        <View
          style={[
            styles.header,
            {
              marginTop: isIOS ? verticalScale(15) : verticalScale(25),
            },
          ]}
        >
          <View style={styles.headerContent}>
            <Text fontSize={isHebrew ? textStyles.H6 : textStyles.H7} fontFamily={fonts.MEDIUM} color={colors.dark} textAlign="center">
              {t("connectParentOrChild:introdactionTitle")}
            </Text>
          </View>
          <TouchableOpacity style={styles.goBackContainer} onPress={() => navigation.goBack()}>
            <ArrowBackIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.containerWrapper}>
          <View style={styles.content}>
            <Text fontSize={isHebrew ? textStyles.H4 : textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.dark} style={styles.title}>
              {t("connectParentOrChild:title")}
            </Text>
            <Text fontSize={isHebrew ? textStyles.H5 : textStyles.H7} fontFamily={fonts.REGULAR} color={colors.dark} style={styles.subtitle}>
              {t("connectParentOrChild:subtitle")}
            </Text>

            <TextInput value={searchValue} onChange={setSearchValue} placeholder={t("connectParentOrChild:searchField")} />

            <View style={styles.contactsContainer}>
              <Text fontSize={isHebrew ? textStyles.H4 : textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.dark} style={styles.contactsTitle}>
                {t("connectParentOrChild:contacts")}
              </Text>
              {noMatches ? (
                <View style={styles.noMatches}>
                  <Text fontSize={isHebrew ? textStyles.H4 : textStyles.H5} fontFamily={fonts.MEDIUM} color={colors.dark} style={styles.contactsTitle}>
                    {t("connectParentOrChild:noMatches")}
                  </Text>
                </View>
              ) : (
                <ScrollView contentContainerStyle={{ width: "100%" }} style={{ height: 300 }} bounces={false}>
                  {contacts?.map((item, index) => {
                    const isSelected = item.recordID === selectedUser?.recordID;
                    return (
                      <TouchableOpacity style={[styles.contactRow, isSelected && styles.contactRowActive]} key={index} onPress={() => setSelectedUser(item)}>
                        {item.hasThumbnail ? (
                          <Image source={{ uri: item.thumbnailPath }} style={styles.userIcon} />
                        ) : (
                          <View style={styles.emptyIcon}>
                            <UserIcon style={styles.empty} />
                          </View>
                        )}

                        <Text fontSize={isHebrew ? textStyles.H5 : textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.dark} style={styles.contactName}>
                          {item.givenName}
                        </Text>
                        <Text fontSize={isHebrew ? textStyles.H5 : textStyles.H6} fontFamily={fonts.MEDIUM} color={colors.dark}>
                          {item.familyName}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </View>
          <View style={styles.button}>
            <PrimaryButton title={t("connectParentOrChild:continue")} disabled={!selectedUser} onPress={() => invite()} />
          </View>
        </View>
      </View>

      {isModalOpen && <InviteStatusModal showModal={isModalOpen} onClose={() => closeModal()} inviteStatus={inviteStatus} parentName={selectedUser?.givenName} />}
    </ImageBackground>
  );
};

export default Invite;
