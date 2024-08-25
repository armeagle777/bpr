import { Text, View } from "@react-pdf/renderer";
import { qkagDocStyles } from "../templates.constants";

const MedSection = ({ title }) => {
  return (
    <View>
      <Text style={qkagDocStyles.sectionHeader}>{title}</Text>
      <View style={qkagDocStyles.row}>
        <View style={qkagDocStyles.labelContainer}>
          <Text style={qkagDocStyles.label}>Left</Text>
        </View>
        <View style={qkagDocStyles.textContainer}>
          <Text style={qkagDocStyles.text}>Right</Text>
        </View>
      </View>
    </View>
  );
};

export default MedSection;
