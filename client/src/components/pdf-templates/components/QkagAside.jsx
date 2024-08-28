import { Text, View } from "@react-pdf/renderer";

import AsideRow from "./AsideRow";
import { QkagDocNameMaps, qkagStyles as styles } from "../templates.constants";

const QkagAside = ({
  type,
  cert_num,
  cert_num2,
  cert_date,
  office_name,
  full_ref_num,
  med,
}) => {
  const {
    title,
    death = {},
    institution_name,
    document_name,
    document_number,
    document_date,
  } = { ...med };
  const { date, place, reason } = { ...death };
  return (
    <View style={styles.aside}>
      <View style={styles.asideSection}>
        <Text style={styles.mainSectionTitle}>Փաստաթղթի տվյալներ</Text>
        <AsideRow
          label={"Փաստաթղթի անվանումը"}
          text={QkagDocNameMaps[type]["name"]}
        />
        <AsideRow label={"Փաստաթղթի N"} text={cert_num || ""} />
        {cert_num2 && <AsideRow label={"Ազգություն"} text={cert_num2 || ""} />}
        <AsideRow label={"Գրանցման ա/թ"} text={cert_date || ""} />
        <AsideRow label={"Գրանցող մարմին"} text={office_name || ""} />
        <AsideRow label={"Հսկիչ N"} text={full_ref_num || ""} />
        {institution_name && (
          <AsideRow
            label={"Քաղաքացիությունը դադարացրել է"}
            text={institution_name}
          />
        )}
        {title && (
          <AsideRow label={"Քաղաքացիությունը դադարացրել է"} text={title} />
        )}
        {document_name && (
          <AsideRow
            label={"Քաղաքացիությունը դադարացրել է"}
            text={document_name}
          />
        )}
        {document_number && (
          <AsideRow
            label={"Քաղաքացիությունը դադարացրել է"}
            text={document_number}
          />
        )}
        {document_date && (
          <AsideRow
            label={"Քաղաքացիությունը դադարացրել է"}
            text={document_date}
          />
        )}
        {place && (
          <AsideRow label={"Քաղաքացիությունը դադարացրել է"} text={place} />
        )}
        {date && (
          <AsideRow label={"Քաղաքացիությունը դադարացրել է"} text={date} />
        )}
        {reason && (
          <AsideRow label={"Քաղաքացիությունը դադարացրել է"} text={reason} />
        )}
      </View>
    </View>
  );
};

export default QkagAside;
