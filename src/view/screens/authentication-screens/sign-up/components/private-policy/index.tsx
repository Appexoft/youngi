import React from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "./styles";

import Modal from "react-native-modal";
import CloseIcon from "~/view/assets/icons/close.svg";
import Text from "~/view/components/Text";
import { textStyles, fonts, colors } from "~/constants/designConstants";
import { verticalScale } from "~/constants/metrics";
import PrimaryButton from "~/view/components/PrimaryButton";

interface Props {
  showModal: boolean;
  close: () => void;
  agree: () => void;
}

const PrivacyPolicy: React.FC<Props> = ({ showModal, close, agree }) => {
  return (
    <Modal isVisible={showModal}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text
            fontSize={textStyles.H4}
            fontFamily={fonts.MEDIUM}
            color={colors.dark}
          >
            תקנון ותנאי שימוש
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={close}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: "100%",
            paddingBottom: verticalScale(58),
          }}
        >
          <ScrollView
            style={styles.scrollView}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.REGULAR}
              color={colors.dark}
              lineHeight={26}
            >
              תנאי הצטרפות למועדון יאנגי ושימוש באפליקציית (יאנגי – מועדון הטבות
              לילדים) יש לקרוא את תנאי ההצטרפות למועדון והשימוש באפליקציה (ביחד
              ''תנאי השימוש'') בעיון לפני לחיצה על כפתור ''אישור'' או שימוש
              באפליקציה.
            </Text>
            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.REGULAR}
              color={colors.dark}
              lineHeight={26}
              style={{ marginTop: verticalScale(15) }}
            >
              מטרת תנאי השימוש הינה להסדיר את היחסים בין יאנגי ילדים ועסקים
              בע''מ (''החברה'' ) לבין כל אדם אשר ברצונו להצטרף למועדון
              (''המשתמש'' או ''אתה''). יובהר כי האפליקציה הינה פלטפורמה המשמשת
              את החברה לאספקת השירותים לחברי המועדון.
            </Text>
            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.MEDIUM}
              color={colors.dark}
              lineHeight={26}
              style={{ marginTop: verticalScale(15) }}
            >
              אם אינך מסכים לתנאי השימוש, נא לחץ על כפתור ''ביטול'' או הימנע
              מלהתקין את האפליקציה או הימנע מיצירת קשר הנוגע לענייני המועדון.
              הנך מאשר כי אם לחצת ''אישור'' כי קראת את כל תנאי השימוש, הבנת את
              תוכנם והסכמת להיות כפוף לתנאיהם ולהיכנס להסכם מחייב עם החברה.
            </Text>

            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.REGULAR}
              color={colors.dark}
              lineHeight={26}
              style={{ marginTop: verticalScale(15) }}
            >
              האפליקציה תציג תכנים רלוונטיים שמיועדים לצעירים בגילאי 12-18
              ותכלול מספר מתחמים מרכזיים אשר המועדון מציע ובהם מתחם הקופונים,
              מתחם הטבות, ואמצעי תשלום באישור ההורים, ההורה מאשר בזאת כי הוא
              מסכים לילד או נער להנות מהמועדון הטבות ולבצע תשלום דרך אמצעי
              התשלום של ההורה, רק לאחר הסכמת ההורה לשימוש כרטיס האשראי לטובת
              הילד.
            </Text>

            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.REGULAR}
              color={colors.dark}
              lineHeight={26}
              style={{ marginTop: verticalScale(15) }}
            >
              ילד או בן נוער שלא קיבל את אישור ההורים להנות מהמועדון הטבות או
              לרכוש מהמועדון ההטבות לא יוכל להנות מהמועדון וההטבות שאפליקציית
              יאנגי מציעה. ''ההורה'' נוטל על עצמך את מלוא האחריות לכך שבחרת לצרף
              את הילד או בן הנוער למועדון ההטבות של יאנגי, ולתוצאות שאליהן
              כיוונת.
            </Text>

            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.REGULAR}
              color={colors.dark}
              lineHeight={26}
              style={{ marginTop: verticalScale(15) }}
            >
              חשבון והרשמה לאפליקציה
            </Text>
            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.REGULAR}
              color={colors.dark}
              lineHeight={26}
              style={{ marginTop: verticalScale(5) }}
            >
              1. הרשמה ראשונית – מובהר בזאת כי השירותים באפליקציה וההנאה
              מהמתחמים השונים של המועדון ניתנים לחברי המועדון בלבד, שירותים אלו
              טעונים הרשמה, במסגרת (1) תידרש למסור מספר טלפון (2) לאחר מכן תקבל
              הודעת SMS מהחברה עם קוד חד פעמי להרשמה לאפליקציה (3) לאחר מכן
              תידרש לספק לחברה מיגע אישי על מנת שהחברה תוכל לסיים את תהליך
              ההרשמה ולאמת את הפרטים שלך, כגון שם פרטי, שם משפחה, כתובת דואר
              אלקטרוני, מין, גיל, תאריך לידה, פרטי כרטיס אשראי של ההורה.
            </Text>

            <Text
              fontSize={textStyles.H5}
              fontFamily={fonts.REGULAR}
              color={colors.dark}
              lineHeight={26}
              style={{ marginTop: verticalScale(15) }}
            >
              החברה שומרת לעצמה את הזכות לדחות כל רישום אל המועדון לאור אי עמידה
              בתנאי המועדון והמשתמש מסיר בזאת כל אחריות מהחברה על ההחלטה זו. ·
              בעת הרשמתך אל האפליקציה, אתה תתבקש לאשר באופן מפורש לחברה לשלוח
              אליך מסרונים, שיחות, טלפון, הודעות אלקטרוניות, פרסומות והצעות
              לשירותים של החברה או של צדדים שלישיים ( להלן ''מסרונים'' ) פרטיותך
              חשובה לנו ולכן אתה יכול בכל עת להחליט להפסיק לקבל את המסרונים על
              ידי שליחת הודעה אל החברה אל הכתובת guyme2014@gmail.com חשוב לנו
              לציין כי על ידי הפסקת קבלת מסרונים אתה לא תוכל
            </Text>

            <View style={styles.button}>
              <PrimaryButton
                title="קראתי ואני מאשר את תנאי השירות"
                onPress={agree}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
export default PrivacyPolicy;
