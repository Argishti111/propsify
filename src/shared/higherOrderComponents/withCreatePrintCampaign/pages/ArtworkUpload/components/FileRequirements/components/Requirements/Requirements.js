import { Box, Link, Typography } from "@mui/material";
import { downloadProductTemplate } from "../../../../../../../../../services";

export const Requirements = ({ id, height, width }) => (
  <>
    <ul className="file-requirements">
      <li>Supported file formats include PDF, PNG, and JPEG</li>
      <li>Images must be 300 dpi or higher</li>
      <li>
        The file dimensions must be {height}.25x{width}.25 (inches){" "}
      </li>
      <li>The file size must be smaller than 5MB</li>
    </ul>
    <Box marginTop={2}>
      <Typography
        fontSize="0.938rem"
        variant="p"
        display="block"
        fontStyle="italic"
        fontWeight="500"
      >
        Read about image prepping{" "}
        <Link color="#192231CC" borderColor="#192231CC" href="#">
          here
        </Link>
        .
      </Typography>
      <Typography
        fontSize="0.938rem"
        variant="p"
        display="block"
        fontStyle="italic"
        fontWeight="500"
      >
        Your file must adhere to our{" "}
        <a
          target="_blank"
          onClick={(e) => {
            e.preventDefault();
            downloadProductTemplate(id);
          }}
          href="#"
        >
          template
        </a>
        .
      </Typography>
    </Box>
  </>
);
