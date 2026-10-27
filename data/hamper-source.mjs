// Read-only final-workbook reconciliation snapshot; never imported by the storefront.
export default {
  "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 27oct -26 Latest Sheet.xlsx",
  "sourceSha256": "ca85e446e30ffed7b79eb9ad945dce6c299e80953807d2e35c5bc777079820d3",
  "sheet": "Sheet1",
  "effectiveDate": "2026-10-27",
  "pricePolicy": "Exact last explicitly labelled POS price/final; never delivery or cost subtotal.",
  "entryCount": 41,
  "expectedCatalogueCount": 71,
  "omittedCodes": [
    "KHP 0009",
    "KHP 0010",
    "KHP 0015",
    "KHP 0016",
    "KHP 0017",
    "KHP 0030",
    "KHP 0042",
    "KHP 0043"
  ],
  "omissionPolicy": "Final supplier list supersedes earlier hamper selection; omitted codes withdrawn.",
  "retainedVariants": [
    {
      "productId": "vintage-peacock",
      "code": "KHP 0040",
      "sourceProductId": "khp-0040"
    },
    {
      "productId": "blue-bloom",
      "code": "KHP 0038",
      "sourceProductId": "khp-0038"
    }
  ],
  "unresolvedSourceNotes": [
    {
      "code": "KHP 0025",
      "name": "Sunehri Khushiyan",
      "type": "weight-conflict",
      "declaredCell": "H233",
      "declaredValue": ".300 Gm",
      "ingredientWeightGrams": 600,
      "chosen": "Ingredient-derived food weight; packaging excluded."
    },
    {
      "code": "KHP 0047",
      "type": "multiple-pos-final",
      "candidates": [
        {
          "label": "Pos Final",
          "labelCell": "I516",
          "cell": "J516",
          "value": 137
        },
        {
          "label": "Pos Final",
          "labelCell": "I517",
          "cell": "J517",
          "value": 140
        }
      ],
      "chosen": {
        "label": "Pos Final",
        "labelCell": "I517",
        "cell": "J517",
        "value": 140
      },
      "reason": "Last explicitly labelled Pos Final row, after the cost/subtotal row."
    },
    {
      "code": "KHP 0048",
      "type": "multiple-pos-final",
      "candidates": [
        {
          "label": "Pos Final",
          "labelCell": "I527",
          "cell": "J527",
          "value": 119
        },
        {
          "label": "Pos Final",
          "labelCell": "I528",
          "cell": "J528",
          "value": 120
        }
      ],
      "chosen": {
        "label": "Pos Final",
        "labelCell": "I528",
        "cell": "J528",
        "value": 120
      },
      "reason": "Last explicitly labelled Pos Final row, after the cost/subtotal row."
    }
  ],
  "entries": [
    {
      "code": "KHP 0001",
      "name": "Golden Nuts Treat",
      "displayName": "Golden Nuts Treat",
      "productId": "golden-nuts-treat",
      "nameCell": "L5",
      "codeCell": "L6",
      "blockRange": "G5:N14",
      "posCell": "M12",
      "posValue": 12,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K12",
          "cell": "M12",
          "value": 12
        }
      ],
      "ingredients": [
        {
          "name": "Mix Premium Nuts",
          "quantity": "100 Gm ",
          "cells": "G7:H7",
          "unit": "g",
          "amount": 100
        }
      ],
      "weightGrams": 100,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 5,
            "sha256": "accecb9eabeaa8b16d335df5d9dc44f5d134184f4c6d6f751e764ef4b0f1669e"
          }
        ]
      }
    },
    {
      "code": "KHP 0002",
      "name": "Khau Galli Nuts Pocket",
      "displayName": "Khau Galli Nuts Pocket",
      "productId": "nuts-pocket",
      "nameCell": "L15",
      "codeCell": "L16",
      "blockRange": "G15:N23",
      "posCell": "M22",
      "posValue": 20,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K22",
          "cell": "M22",
          "value": 20
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.05,
          "cells": "G15:H15",
          "unit": "g",
          "amount": 50
        },
        {
          "name": "Almond",
          "quantity": 0.05,
          "cells": "G16:H16",
          "unit": "g",
          "amount": 50
        },
        {
          "name": "Salted Pista",
          "quantity": 0.05,
          "cells": "G17:H17",
          "unit": "g",
          "amount": 50
        },
        {
          "name": "Raisin",
          "quantity": 0.05,
          "cells": "G18:H18",
          "unit": "g",
          "amount": 50
        }
      ],
      "weightGrams": 200,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 15,
            "sha256": "88ed455b186f14c3afa32128e903bb5af410e8d8c88fc74e992be3201d54ffab"
          }
        ]
      }
    },
    {
      "code": "KHP 0003",
      "name": "Festival Mix Bites",
      "displayName": "Festival Mix Bites",
      "productId": "festive-mix-bites",
      "nameCell": "L24",
      "codeCell": "L25",
      "blockRange": "G24:N32",
      "posCell": "M31",
      "posValue": 20,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K31",
          "cell": "M31",
          "value": 20
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.1,
          "cells": "G24:H24",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Almond",
          "quantity": 0.1,
          "cells": "G25:H25",
          "unit": "g",
          "amount": 100
        }
      ],
      "weightGrams": 200,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 24,
            "sha256": "bb6e051f97702173d0e5e9c094441b97946bd797436d210463dfd1d7087faf95"
          }
        ]
      }
    },
    {
      "code": "KHP 0004",
      "name": "Festive Crunch Combo",
      "displayName": "Festive Crunch Combo",
      "productId": "festive-crunch",
      "nameCell": "L33",
      "codeCell": "L34",
      "blockRange": "G33:N41",
      "posCell": "M39",
      "posValue": 20,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K39",
          "cell": "M39",
          "value": 20
        }
      ],
      "ingredients": [
        {
          "name": "Mix Premium Nuts",
          "quantity": ".200 Gm",
          "cells": "G34:H34",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 200,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 33,
            "sha256": "882dbe42cb0f2383c7a8d9a13248694d1617351f25f58f4f288c6f7bca66ed93"
          }
        ]
      }
    },
    {
      "code": "KHP 0005",
      "name": "Khau Galli Premium Box",
      "displayName": "Khau Galli Premium Box",
      "productId": "mini-nut-delight",
      "nameCell": "L42",
      "codeCell": "L43",
      "blockRange": "G42:N50",
      "posCell": "M48",
      "posValue": 35,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K48",
          "cell": "M48",
          "value": 35
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G42:H42",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G43:H43",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 400,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 42,
            "sha256": "0d0351febe35df68f59e594fbb4ba355a3a4ed2d49b380b108493319a99fabdf"
          }
        ]
      }
    },
    {
      "code": "KHP 0006",
      "name": "Gourmet Mix",
      "displayName": "Gourmet Mix",
      "productId": "khp-0006",
      "nameCell": "L51",
      "codeCell": "L52",
      "blockRange": "G51:N59",
      "posCell": "M56",
      "posValue": 30,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K56",
          "cell": "M56",
          "value": 30
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.1,
          "cells": "G51:H51",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Almond",
          "quantity": 0.1,
          "cells": "G52:H52",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Salted Pista",
          "quantity": 0.1,
          "cells": "G53:H53",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Raisin",
          "quantity": 0.1,
          "cells": "G54:H54",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "khau galli hamper bag small",
          "quantity": null,
          "cells": "G55:H55",
          "unit": "packaging"
        }
      ],
      "weightGrams": 400,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 51,
            "sha256": "354687414b0982a1fe0e8eff5bf90b4f1755eb63b994e6e1b0549b8db7f7291d"
          }
        ]
      }
    },
    {
      "code": "KHP 0007",
      "name": "Executive Hamper",
      "displayName": "Executive Hamper",
      "productId": "executive-hamper",
      "nameCell": "L60",
      "codeCell": "L61",
      "blockRange": "G60:N68",
      "posCell": "M65",
      "posValue": 50,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K65",
          "cell": "M65",
          "value": 50
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G60:H60",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G61:H61",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "1 Pc Latus Diya",
          "quantity": 1,
          "cells": "G63:H63",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 400,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 60,
            "sha256": "ad25a444f0a379b0c755f59bed51187143c08e12a533515ecc946062c61b3464"
          }
        ]
      }
    },
    {
      "code": "KHP 0008",
      "name": "Elite Gift Box",
      "displayName": "Elite Gift Box",
      "productId": "elite-hamper",
      "nameCell": "L69",
      "codeCell": "L70",
      "blockRange": "G69:N79",
      "posCell": "M74",
      "posValue": 75,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K74",
          "cell": "M74",
          "value": 75
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G69:H69",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G70:H70",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G71:H71",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G72:H72",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "1 Pc Latus Diya",
          "quantity": 1,
          "cells": "G73:H73",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 800,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 69,
            "sha256": "c2245bb7c9fbd6b605c2ae87c86821d1035dd4656b47533cc342d97e260a606f"
          }
        ]
      }
    },
    {
      "code": "KHP 0011",
      "name": "Nazakat Potli",
      "displayName": "Nazakat Potli",
      "productId": "nazakat-potli",
      "nameCell": "L80",
      "codeCell": "L81",
      "blockRange": "G80:N91",
      "posCell": "M87",
      "posValue": 110,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K87",
          "cell": "M87",
          "value": 110
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G83:H83",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G84:H84",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G85:H85",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 600,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 106,
            "sha256": "4ec9db16c02669e38e4fcc5812cbf082c82e44dd581e75fe6c23f371b47b88a2"
          }
        ]
      }
    },
    {
      "code": "KHP 0012",
      "name": "Phoolon Ki Chhaon Hamper",
      "displayName": "Phoolon Ki Chhaon Hamper",
      "productId": "phoolon-ki-chhaon",
      "nameCell": "L92",
      "codeCell": "L93",
      "blockRange": "G92:N104",
      "posCell": "M100",
      "posValue": 115,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K100",
          "cell": "M100",
          "value": 115
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G95:H95",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G96:H96",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Kaju Apple",
          "quantity": 0.1,
          "cells": "G97:H97",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Dry Fruit Cassata",
          "quantity": 0.1,
          "cells": "G98:H98",
          "unit": "g",
          "amount": 100
        }
      ],
      "weightGrams": 600,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 117,
            "sha256": "e46fd81b5b08238dbd639f72cb8509f02811ca73a8832e103a017364c5aa4cb1"
          }
        ]
      }
    },
    {
      "code": "KHP 0013",
      "name": "Enamel Tray With Dry Fruit",
      "displayName": "Enamel Tray With Dry Fruit",
      "productId": "pichwai-lotus-tray",
      "nameCell": "L105",
      "codeCell": "L106",
      "blockRange": "G105:N116",
      "posCell": "M110",
      "posValue": 80,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K110",
          "cell": "M110",
          "value": 80
        }
      ],
      "ingredients": [
        {
          "name": "Mix Premium Nuts",
          "quantity": 0.2,
          "cells": "G106:H106",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "ENAMEL TRAY",
          "quantity": 1,
          "cells": "G107:H107",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 200,
      "sourcePhotos": [
        {
          "anchorRow": 105,
          "sha256": "93b249519600a3b3416e8e9cfd17449c9852de3074801e0f44536ee5e2621216"
        }
      ],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 131,
            "sha256": "93b249519600a3b3416e8e9cfd17449c9852de3074801e0f44536ee5e2621216"
          }
        ]
      }
    },
    {
      "code": "KHP 0014",
      "name": "Pyaar Ka Pitara",
      "displayName": "Pyaar Ka Pitara",
      "productId": "tofha",
      "nameCell": "L117",
      "codeCell": "L118",
      "blockRange": "G117:N129",
      "posCell": "M124",
      "posValue": 130,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K124",
          "cell": "M124",
          "value": 130
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G117:H117",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G118:H118",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G119:H119",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G120:H120",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Chana Dal",
          "quantity": 0.2,
          "cells": "G121:H121",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Namak Para",
          "quantity": 0.2,
          "cells": "G122:H122",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Diya Tlight",
          "quantity": 1,
          "cells": "G123:H123",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 1200,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 143,
            "sha256": "69740abfe5241df020e9f957fc1653cab033144bc954205d73950b305d7d063a"
          }
        ]
      }
    },
    {
      "code": "KHP 0018",
      "name": "The Sagun Box",
      "displayName": "The Sagun Box",
      "productId": "khp-0018",
      "nameCell": "L130",
      "codeCell": "L131",
      "blockRange": "G130:N142",
      "posCell": "M138",
      "posValue": 130,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K138",
          "cell": "M138",
          "value": 130
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G130:H130",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G131:H131",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G132:H132",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G133:H133",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Methi Mathri",
          "quantity": 0.2,
          "cells": "G134:H134",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Masala Chana Dal",
          "quantity": 0.2,
          "cells": "G135:H135",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Pichwai Shubh Labh",
          "quantity": 1,
          "cells": "G136:H136",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 1200,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 191,
            "sha256": "bcce8093a2e5ada379ae59910b9f88bf2f6c12d3101444c97e09c9b764ad0dd9"
          }
        ]
      }
    },
    {
      "code": "KHP 0019",
      "name": "Mehfil-e-Mithaas",
      "displayName": "Mehfil-e-Mithaas",
      "productId": "khp-0019",
      "nameCell": "L143",
      "codeCell": "L144",
      "blockRange": "G143:N153",
      "posCell": "M149",
      "posValue": 130,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K149",
          "cell": "M149",
          "value": 130
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G143:H143",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G144:H144",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G145:H145",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G146:H146",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Methi Mathri",
          "quantity": 0.2,
          "cells": "G147:H147",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Masala Chana Dal",
          "quantity": 0.2,
          "cells": "G148:H148",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Pichwai Shubh Labh",
          "quantity": 1,
          "cells": "G149:H149",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 1200,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 204,
            "sha256": "5cae470d653046825544b6690e64c99e464911789a8003ad5a39b2fbdf849f08"
          }
        ]
      }
    },
    {
      "code": "KHP 0020",
      "name": "Apno Ke liye",
      "displayName": "Apno Ke liye",
      "productId": "apno-ke-liye",
      "nameCell": "L154",
      "codeCell": "L155",
      "blockRange": "G154:N167",
      "posCell": "M162",
      "posValue": 130,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K162",
          "cell": "M162",
          "value": 130
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G154:H154",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G155:H155",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G156:H156",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G157:H157",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Namak Para",
          "quantity": 0.2,
          "cells": "G158:H158",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Masala Chana Dal",
          "quantity": 0.2,
          "cells": "G159:H159",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Diya Tlight",
          "quantity": 1,
          "cells": "G160:H160",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 1200,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 215,
            "sha256": "24aca61684381f6c8b226f3893d5fa555bd396f6f8560e4f1826f7a1de6a64a0"
          }
        ]
      }
    },
    {
      "code": "KHP 0021",
      "name": "Shahi Mehfil",
      "displayName": "Shahi Mehfil",
      "productId": "khp-0021",
      "nameCell": "L168",
      "codeCell": "L169",
      "blockRange": "G168:N181",
      "posCell": "M176",
      "posValue": 135,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K176",
          "cell": "M176",
          "value": 135
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G168:H168",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G169:H169",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G170:H170",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G171:H171",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Namak Para",
          "quantity": 0.2,
          "cells": "G172:H172",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Masala Chana Dal",
          "quantity": 0.2,
          "cells": "G173:H173",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Diya Satrangi Tlight",
          "quantity": 1,
          "cells": "G174:H174",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 1200,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 229,
            "sha256": "2c94a2d87aaffa95db68b423de6890914d584adeebebac70453c4a9f48cb0925"
          }
        ]
      }
    },
    {
      "code": "KHP 0022",
      "name": "Utsav Box",
      "displayName": "Utsav Box",
      "productId": "utsav-box",
      "nameCell": "L182",
      "codeCell": "L183",
      "blockRange": "G182:N195",
      "posCell": "M191",
      "posValue": 85,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K191",
          "cell": "M191",
          "value": 85
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.1,
          "cells": "G182:H182",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Almond",
          "quantity": 0.1,
          "cells": "G183:H183",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Salted Pista",
          "quantity": 0.1,
          "cells": "G184:H184",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Pichwai Shubh Labh",
          "quantity": 1,
          "cells": "G188:H188",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 300,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 243,
            "sha256": "6b1e05eac75bfd942c97d787874feee214048ffa2db685ba49ba8289ad20de91"
          }
        ]
      }
    },
    {
      "code": "KHP 0023",
      "name": "Shubh Milan",
      "displayName": "Shubh Milan",
      "productId": "khp-0023",
      "nameCell": "L196",
      "codeCell": "L197",
      "blockRange": "G196:N210",
      "posCell": "M205",
      "posValue": 95,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K205",
          "cell": "M205",
          "value": 95
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.1,
          "cells": "G196:H196",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Almond",
          "quantity": 0.1,
          "cells": "G197:H197",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Salted Pista",
          "quantity": 0.1,
          "cells": "G198:H198",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Raisin",
          "quantity": 0.1,
          "cells": "G199:H199",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Pichwai Shubh Labh",
          "quantity": 1,
          "cells": "G202:H202",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 400,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 257,
            "sha256": "0664a2f86dc67dc258f8dc7527b834fcd12a6c72a0b55eb13c58b87f0969e7eb"
          }
        ]
      }
    },
    {
      "code": "KHP 0024",
      "name": "Aastha",
      "displayName": "Aastha",
      "productId": "khp-0024",
      "nameCell": "L211",
      "codeCell": "L212",
      "blockRange": "G211:N225",
      "posCell": "M219",
      "posValue": 125,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K219",
          "cell": "M219",
          "value": 125
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G211:H211",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G212:H212",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G213:H213",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G214:H214",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Pichwai Shubh Labh",
          "quantity": 1,
          "cells": "G217:H217",
          "unit": "pc",
          "amount": 1
        }
      ],
      "weightGrams": 800,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 272,
            "sha256": "82e3c8ea070812d5b6797281dc1641091cafb54bab4cedeff448bbe51e0acc25"
          }
        ]
      }
    },
    {
      "code": "KHP 0025",
      "name": "Sunehri Khushiyan",
      "displayName": "Sunehri Khushiyan",
      "productId": "shubh-trio",
      "nameCell": "L226",
      "codeCell": "L227",
      "blockRange": "G226:N239",
      "posCell": "M233",
      "posValue": 90,
      "posCandidates": [
        {
          "label": "Pos Price",
          "labelCell": "K233",
          "cell": "M233",
          "value": 90
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G226:H226",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G227:H227",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Masala Chana Dal",
          "quantity": 0.2,
          "cells": "G228:H228",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 600,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 287,
            "sha256": "6c12f9156af356c1f8794af6c4c414a51a492e8097e1f10cc60e5f8226e03181"
          }
        ]
      }
    },
    {
      "code": "KHP 0025",
      "name": "Jharokha Box",
      "displayName": "Jharokha Box",
      "productId": "heritage-nut-box",
      "nameCell": "L240",
      "codeCell": "L241",
      "blockRange": "G240:N253",
      "posCell": "J250",
      "posValue": 100,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I250",
          "cell": "J250",
          "value": 100
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G240:H240",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G241:H241",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 400,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 301,
            "sha256": "86e92dd3ce9b0f36d187bc42d982f7f3b2871364fc26e20bf7b2923d83a6eff4"
          }
        ]
      }
    },
    {
      "code": "KHP 0026",
      "name": "Gokul Box",
      "displayName": "Gokul Box",
      "productId": "royal-dry-fruit-box",
      "nameCell": "L254",
      "codeCell": "L255",
      "blockRange": "G254:N267",
      "posCell": "J264",
      "posValue": 120,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I264",
          "cell": "J264",
          "value": 120
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G254:H254",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G255:H255",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.15,
          "cells": "G256:H256",
          "unit": "g",
          "amount": 150
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G257:H257",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 750,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 315,
            "sha256": "5c294a07a360ec8fdc42499da4d29abc6150969b220008170e9307c928cc6cae"
          }
        ]
      }
    },
    {
      "code": "KHP 0027",
      "name": "The Palace Hamper",
      "displayName": "The Palace Hamper",
      "productId": "raj-mahal-darwaza",
      "nameCell": "L268",
      "codeCell": "L269",
      "blockRange": "G268:N282",
      "posCell": "J278",
      "posValue": 150,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I278",
          "cell": "J278",
          "value": 150
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.15,
          "cells": "G268:H268",
          "unit": "g",
          "amount": 150
        },
        {
          "name": "Almond",
          "quantity": 0.15,
          "cells": "G269:H269",
          "unit": "g",
          "amount": 150
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.3,
          "cells": "G271:H271",
          "unit": "g",
          "amount": 300
        }
      ],
      "weightGrams": 600,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 329,
            "sha256": "bb2c4f0b03749d3e80af3a096bcfd635596eb9090d56f53ab1451f384ea5f98f"
          }
        ]
      }
    },
    {
      "code": "KHP 0028",
      "name": "The Botanical Hamper",
      "displayName": "The Botanical Hamper",
      "productId": "vasant-bagh",
      "nameCell": "L283",
      "codeCell": "L284",
      "blockRange": "G283:N298",
      "posCell": "J293",
      "posValue": 180,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I293",
          "cell": "J293",
          "value": 180
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G283:H283",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G284:H284",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.15,
          "cells": "G285:H285",
          "unit": "g",
          "amount": 150
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.3,
          "cells": "G287:H287",
          "unit": "g",
          "amount": 300
        }
      ],
      "weightGrams": 850,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 344,
            "sha256": "687474fea18826589d0e97ee384087608a2ea6a01e0d56e9a040c7a0a46c3408"
          },
          {
            "anchorRow": 351,
            "sha256": "82627758511973c495189912f38bb408af88305b0c160d812c29d6a1fea1211d"
          }
        ]
      }
    },
    {
      "code": "KHP 0029",
      "name": "The Tall Ganesha Hamper",
      "displayName": "The Tall Ganesha Hamper",
      "productId": "divya-darshan-box",
      "nameCell": "L299",
      "codeCell": "L300",
      "blockRange": "G299:N312",
      "posCell": "J309",
      "posValue": 145,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I309",
          "cell": "J309",
          "value": 145
        }
      ],
      "ingredients": [
        {
          "name": "Fancy Sweet",
          "quantity": ".400 Gm",
          "cells": "G300:H300",
          "unit": "g",
          "amount": 400
        }
      ],
      "weightGrams": 400,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 360,
            "sha256": "80eb8236e9101a865d699f532122b99ed06c972d3ddfd786afa3b9a46b254608"
          }
        ]
      }
    },
    {
      "code": "KHP 0031",
      "name": "Royal Ganesha",
      "displayName": "Royal Ganesha",
      "productId": "royal-ganesha",
      "nameCell": "L313",
      "codeCell": "L314",
      "blockRange": "G313:N329",
      "posCell": "J323",
      "posValue": 210,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I323",
          "cell": "J323",
          "value": 210
        }
      ],
      "ingredients": [
        {
          "name": "Fancy Sweet",
          "quantity": ".800 Gm",
          "cells": "G314:H314",
          "unit": "g",
          "amount": 800
        }
      ],
      "weightGrams": 800,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 388,
            "sha256": "e9c10fff6a4b5bc188415e36a1ea707f8408db62d0c92ac835b25f3ffc5d9e10"
          }
        ]
      }
    },
    {
      "code": "KHP 0032",
      "name": "Elegant Gift Hamper",
      "displayName": "Elegant Gift Hamper",
      "productId": "duo-treat",
      "nameCell": "L330",
      "codeCell": "L331",
      "blockRange": "G330:N343",
      "posCell": "J338",
      "posValue": 60,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I338",
          "cell": "J338",
          "value": 60
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G330:H330",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G331:H331",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 400,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 404,
            "sha256": "0dc831cb71e3e2bcb8250e11d1783e8a841b65a37dc6899f414206b89a913caa"
          }
        ]
      }
    },
    {
      "code": "KHP 0033",
      "name": "Golden Harvest Gift Box",
      "displayName": "Golden Harvest Gift Box",
      "productId": "shahi-mefhil",
      "nameCell": "L344",
      "codeCell": "L345",
      "blockRange": "G344:N357",
      "posCell": "J352",
      "posValue": 80,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I352",
          "cell": "J352",
          "value": 80
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G344:H344",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G345:H345",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G346:H346",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 600,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 419,
            "sha256": "13a1f12764c83f28c00e9942b93ea0082c0cb29baf88e8f12f44278ff97986db"
          }
        ]
      }
    },
    {
      "code": "KHP 0034",
      "name": "Royal Nut Collection",
      "displayName": "Royal Nut Collection",
      "productId": "royal-nut-collection",
      "nameCell": "L358",
      "codeCell": "L359",
      "blockRange": "G358:N370",
      "posCell": "J366",
      "posValue": 115,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I366",
          "cell": "J366",
          "value": 115
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G358:H358",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G359:H359",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G360:H360",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 600,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 433,
            "sha256": "8f1d2a68accb240f206424de1c45327cc7d7db4041534510ac8b5d91cd1fa8ae"
          }
        ]
      }
    },
    {
      "code": "KHP 0035",
      "name": "Blue Royale Gift Hamper Box",
      "displayName": "Blue Royale Gift Hamper Box",
      "productId": "royal-bloom",
      "nameCell": "L371",
      "codeCell": "L372",
      "blockRange": "G371:N384",
      "posCell": "J381",
      "posValue": 140,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I381",
          "cell": "J381",
          "value": 140
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.13,
          "cells": "G371:H371",
          "unit": "g",
          "amount": 130
        },
        {
          "name": "Almond",
          "quantity": 0.13,
          "cells": "G372:H372",
          "unit": "g",
          "amount": 130
        },
        {
          "name": "Salted Pista",
          "quantity": 0.1,
          "cells": "G373:H373",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Raisin",
          "quantity": 0.13,
          "cells": "G374:H374",
          "unit": "g",
          "amount": 130
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.15,
          "cells": "G375:H375",
          "unit": "g",
          "amount": 150
        }
      ],
      "weightGrams": 640,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 446,
            "sha256": "f05a290b534ec0000da309e7b6c2653964b6b46eb5265c6e5560d4bcf35eaa01"
          }
        ]
      }
    },
    {
      "code": "KHP 0036",
      "name": "Rajwadi Delight Box",
      "displayName": "Rajwadi Delight Box",
      "productId": "royal-heritage-deluxe-box",
      "nameCell": "L385",
      "codeCell": "L386",
      "blockRange": "G385:N400",
      "posCell": "J395",
      "posValue": 125,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I395",
          "cell": "J395",
          "value": 125
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.1,
          "cells": "G385:H385",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Almond",
          "quantity": 0.1,
          "cells": "G386:H386",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.15,
          "cells": "G389:H389",
          "unit": "g",
          "amount": 150
        }
      ],
      "weightGrams": 350,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 460,
            "sha256": "0d4db842f616fdd23342a55cf59de2841f5f9033fe176935f4a4f0bb2bde5e52"
          }
        ]
      }
    },
    {
      "code": "KHP 0037",
      "name": null,
      "displayName": "Jashn-e-Diwali",
      "productId": "khp-0037",
      "nameCell": "M401",
      "codeCell": "M402",
      "blockRange": "G401:N414",
      "posCell": "J410",
      "posValue": 185,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I410",
          "cell": "J410",
          "value": 185
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G401:H401",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G402:H402",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G403:H403",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G404:H404",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Methi Mathri",
          "quantity": 0.15,
          "cells": "G405:H405",
          "unit": "g",
          "amount": 150
        },
        {
          "name": "Chana Dal",
          "quantity": 0.15,
          "cells": "G406:H406",
          "unit": "g",
          "amount": 150
        }
      ],
      "weightGrams": 1100,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 475,
            "sha256": "0f8eab1bc1cf6e4ee2badfed46211e2e61172e2d40e2c7ec58e6972c80a08e13"
          },
          {
            "anchorRow": 481,
            "sha256": "155d44d9faefa3109d50a5b7686598976f68109f8c5f1ebf59b188ae11c1efe6"
          }
        ]
      }
    },
    {
      "code": "KHP 0038",
      "name": null,
      "displayName": "Mithaas Ka Tohfa",
      "productId": "khp-0038",
      "nameCell": "M415",
      "codeCell": "M416",
      "blockRange": "G415:N426",
      "posCell": "J423",
      "posValue": 125,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I423",
          "cell": "J423",
          "value": 125
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G415:H415",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G416:H416",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.2,
          "cells": "G417:H417",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G418:H418",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.2,
          "cells": "G419:H419",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 1000,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 489,
            "sha256": "2186bc16f3838b856ea230458911396c0c9777ec527e9bedb621be6eb21544fb"
          }
        ]
      }
    },
    {
      "code": "KHP 0039",
      "name": null,
      "displayName": "Shahi Nazrana",
      "productId": "khp-0039",
      "nameCell": "M427",
      "codeCell": "M428",
      "blockRange": "G427:N439",
      "posCell": "J434",
      "posValue": 155,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I434",
          "cell": "J434",
          "value": 155
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G427:H427",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G428:H428",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.15,
          "cells": "G429:H429",
          "unit": "g",
          "amount": 150
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.30000000000000004,
          "cells": "G430:H430",
          "unit": "g",
          "amount": 300
        }
      ],
      "weightGrams": 850,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 501,
            "sha256": "90f192de202f1cb5680d57328869032be278f3d9fda49750d06258ff0326d052"
          },
          {
            "anchorRow": 507,
            "sha256": "31de7ca85db1dc3d5e16d32ab31cada0b232e79543a5d56efc25c5b6219c5046"
          }
        ]
      }
    },
    {
      "code": "KHP 0040",
      "name": null,
      "displayName": "Sampann Dry Fruit Hamper",
      "productId": "khp-0040",
      "nameCell": "M440",
      "codeCell": "M441",
      "blockRange": "G440:N453",
      "posCell": "J447",
      "posValue": 115,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I447",
          "cell": "J447",
          "value": 115
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G440:H440",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G441:H441",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.15,
          "cells": "G442:H442",
          "unit": "g",
          "amount": 150
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G443:H443",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 750,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 514,
            "sha256": "932c7189d7d6e41b3ffda446be9e356901c8fd9c8979d73ddd782d1b90c0609f"
          },
          {
            "anchorRow": 520,
            "sha256": "59497cb6e86d3ff7755185e08131b53d62be6d0adcd73b855dc9c3df673e6814"
          }
        ]
      }
    },
    {
      "code": "KHP 0041",
      "name": null,
      "displayName": "Anmol Khushiyan",
      "productId": "khp-0041",
      "nameCell": "M454",
      "codeCell": "M455",
      "blockRange": "G454:N468",
      "posCell": "J461",
      "posValue": 115,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I461",
          "cell": "J461",
          "value": 115
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.1,
          "cells": "G454:H454",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Almond",
          "quantity": 0.1,
          "cells": "G455:H455",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Salted Pista",
          "quantity": 0.1,
          "cells": "G456:H456",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Raisin",
          "quantity": 0.1,
          "cells": "G457:H457",
          "unit": "g",
          "amount": 100
        }
      ],
      "weightGrams": 400,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 528,
            "sha256": "7e2a73c4160e84a001af19c296d82c47ef735fa37b441fbce2d9617b224b9e46"
          },
          {
            "anchorRow": 534,
            "sha256": "d628ce89fe6f6cf4f8128e7afefaeb2a60d1198c54b2b10029308358498981e3"
          }
        ]
      }
    },
    {
      "code": "KHP 0044",
      "name": null,
      "displayName": "Shahi Trio",
      "productId": "khp-0044",
      "nameCell": "M469",
      "codeCell": "M470",
      "blockRange": "G469:N482",
      "posCell": "J475",
      "posValue": 90,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I475",
          "cell": "J475",
          "value": 90
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G469:H469",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G470:H470",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.15,
          "cells": "G471:H471",
          "unit": "g",
          "amount": 150
        }
      ],
      "weightGrams": 550,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 570,
            "sha256": "112ee68f0d08f04387043f051cc1559b4bfd903d7e2714414cb45ccbc97619d7"
          },
          {
            "anchorRow": 576,
            "sha256": "c61dcf7c0df395bb5a75d0b96cdfea282a4f4ed76045b4da7aaf4cda42b794bb"
          }
        ]
      }
    },
    {
      "code": "KHP 0045",
      "name": null,
      "displayName": "Rang Mahal Gift Box",
      "productId": "khp-0045",
      "nameCell": "M483",
      "codeCell": "M484",
      "blockRange": "G483:N496",
      "posCell": "J489",
      "posValue": 130,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I489",
          "cell": "J489",
          "value": 130
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.2,
          "cells": "G483:H483",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G484:H484",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.2,
          "cells": "G485:H485",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 600,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 584,
            "sha256": "aa8438ebff5c6eadf0ec3dc6ef35667acad0c8dad2202c9cbfa0bfc9133e9a94"
          },
          {
            "anchorRow": 590,
            "sha256": "905acfc55c5c3fe5a3363691d01a26b8a4b452a98dc66abdba8c164bd6fa400c"
          }
        ]
      }
    },
    {
      "code": "KHP 0046",
      "name": null,
      "displayName": "Orange Blossom",
      "productId": "orange-blossom",
      "nameCell": "M497",
      "codeCell": "M498",
      "blockRange": "G497:N509",
      "posCell": "J503",
      "posValue": 140,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I503",
          "cell": "J503",
          "value": 140
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.1,
          "cells": "G497:H497",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Almond",
          "quantity": 0.1,
          "cells": "G498:H498",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Salted Pista",
          "quantity": 0.1,
          "cells": "G499:H499",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Raisin",
          "quantity": 0.1,
          "cells": "G500:H500",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.3,
          "cells": "G501:H501",
          "unit": "g",
          "amount": 300
        }
      ],
      "weightGrams": 700,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 598,
            "sha256": "031ec771e54438d4c7f3e945e5af102e89d2777d246009abbbc5741e83e12015"
          },
          {
            "anchorRow": 604,
            "sha256": "25318d94e9f23bcdafe25848cb3d306cfe1d8271c98b72b20aecfab97f150173"
          }
        ]
      }
    },
    {
      "code": "KHP 0047",
      "name": null,
      "displayName": "Hexa Delight Hamper",
      "productId": "khp-0047",
      "nameCell": "M510",
      "codeCell": "M511",
      "blockRange": "G510:N520",
      "posCell": "J517",
      "posValue": 140,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I516",
          "cell": "J516",
          "value": 137
        },
        {
          "label": "Pos Final",
          "labelCell": "I517",
          "cell": "J517",
          "value": 140
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.1,
          "cells": "G510:H510",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Almond",
          "quantity": 0.2,
          "cells": "G511:H511",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Salted Pista",
          "quantity": 0.1,
          "cells": "G512:H512",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Raisin",
          "quantity": 0.2,
          "cells": "G513:H513",
          "unit": "g",
          "amount": 200
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.2,
          "cells": "G514:H514",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 800,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 611,
            "sha256": "89f4f1158384117f4121ea41ca4322ed439ee5b21273a4b083f74c1aad53c0e4"
          }
        ]
      }
    },
    {
      "code": "KHP 0048",
      "name": null,
      "displayName": "Mithaas Square Gift Box",
      "productId": "khp-0048",
      "nameCell": "M521",
      "codeCell": "M522",
      "blockRange": "G521:N530",
      "posCell": "J528",
      "posValue": 120,
      "posCandidates": [
        {
          "label": "Pos Final",
          "labelCell": "I527",
          "cell": "J527",
          "value": 119
        },
        {
          "label": "Pos Final",
          "labelCell": "I528",
          "cell": "J528",
          "value": 120
        }
      ],
      "ingredients": [
        {
          "name": "Cashew",
          "quantity": 0.1,
          "cells": "G521:H521",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Almond",
          "quantity": 0.1,
          "cells": "G522:H522",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Salted Pista",
          "quantity": 0.1,
          "cells": "G523:H523",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Raisin",
          "quantity": 0.1,
          "cells": "G524:H524",
          "unit": "g",
          "amount": 100
        },
        {
          "name": "Fancy Sweet",
          "quantity": 0.2,
          "cells": "G525:H525",
          "unit": "g",
          "amount": 200
        }
      ],
      "weightGrams": 600,
      "sourcePhotos": [],
      "retainedPhotoSource": {
        "sourceFile": "Hamper Pos Price & Delivery Price 2026  UP Date 14-oct -26 Latest Sheet (3).xlsx",
        "photos": [
          {
            "anchorRow": 622,
            "sha256": "d6f75533f800a41f6dd0231eacfa84865970e299c86c195c5dae53c6ccf91711"
          }
        ]
      }
    }
  ]
};
