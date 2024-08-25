import { Text, View } from "@react-pdf/renderer";
import { qkagDocStyles } from "../templates.constants";
import QkagDocRow from "./QkagDocRow";

const PersonSection = ({
  title,
  psn,
  id_type,
  id_number,
  citizenship,
  id_department,
  id_issue_date,
  id_expirey_date,
  base_info,
  new_last_name,
  gender,
  birth,
  resident,
  education_level,
  employment_status,
  marital_status,
  marriage_number,
}) => {
  return (
    <View>
      <Text style={qkagDocStyles.sectionHeader}>{title}</Text>
      <View style={qkagDocStyles.personContent}>
        <QkagDocRow label={"անունը"} text={base_info?.name || ""} />
        <QkagDocRow label={"հայրանունը"} text={base_info?.fathers_name || ""} />
        <QkagDocRow label={"ազգանունը"} text={base_info?.last_name || ""} />
        {base_info?.nationality && (
          <QkagDocRow
            label={"ազգությունը"}
            text={
              base_info?.nationality === "40" ? "Հայ" : base_info?.nationality
            }
          />
        )}
        <QkagDocRow label={"ծննդյան ա/թ"} text={base_info?.birth_date || ""} />
        <QkagDocRow label={"սեռ"} text={gender == "1" ? "Ա" : "Ի"} />
        <QkagDocRow label={"հծհ"} text={psn || ""} />
      </View>
    </View>
  );
};

export default PersonSection;
