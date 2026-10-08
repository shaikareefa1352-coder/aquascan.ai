/* =====================================================
   AQUASCAN AI - WORKING LEVEL 1 PROTOTYPE
   ===================================================== */

let uploadedDamImage = null;
let uploadedFileName = "";
let validInspectionImage = false;
let inspectionCompleted = false;
let detectedDefects = [];


/* =====================================================
   PAGE NAVIGATION
   ===================================================== */

function showPage(pageName) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageName);

    if (page) {
        page.classList.add("active");
    }

    const titles = {

        dashboard: [
            "AquaScan AI Dashboard",
            "Autonomous underwater infrastructure inspection"
        ],

        inspection: [
            "Live Inspection",
            "Dam and underwater infrastructure inspection"
        ],

        detection: [
            "AI Defect Detection",
            "Detected defect location"
        ],

        map: [
            "Defect Location Map",
            "Exact detected defect location"
        ],

        reports: [
            "Inspection Reports",
            "Defect-specific inspection report"
        ]
    };

    if (titles[pageName]) {

        const title =
            document.getElementById("pageTitle");

        const subtitle =
            document.getElementById("pageSubtitle");

        if (title) {
            title.innerText =
                titles[pageName][0];
        }

        if (subtitle) {
            subtitle.innerText =
                titles[pageName][1];
        }
    }

    window.scrollTo(0, 0);
}


/* =====================================================
   DEMO
   ===================================================== */

function startDemo() {

    showPage("inspection");

    notify(
        "Upload a dam image to start inspection"
    );
}


/* =====================================================
   IMAGE UPLOAD
   ===================================================== */

const inspectionInput =
    document.getElementById("inspectionInput");

if (inspectionInput) {

    inspectionInput.addEventListener(
        "change",
        function (event) {

            const file =
                event.target.files[0];

            if (!file) return;

            uploadedFileName =
                file.name.toLowerCase();

            uploadedDamImage =
                URL.createObjectURL(file);

            validInspectionImage = true;

            inspectionCompleted = false;

            detectedDefects = [];


            /* MAIN INSPECTION IMAGE */

            const image =
                document.getElementById(
                    "inspectionImage"
                );

            if (image) {

                image.src =
                    uploadedDamImage;

                image.classList.remove(
                    "hidden"
                );
            }


            const placeholder =
                document.getElementById(
                    "inspectionPlaceholder"
                );

            if (placeholder) {

                placeholder.classList.add(
                    "hidden"
                );
            }


            /* DASHBOARD IMAGE */

            const dashboardImage =
                document.getElementById(
                    "dashboardImage"
                );

            if (dashboardImage) {

                dashboardImage.src =
                    uploadedDamImage;

                dashboardImage.classList.remove(
                    "hidden"
                );
            }


            const defaultCamera =
                document.getElementById(
                    "defaultCamera"
                );

            if (defaultCamera) {

                defaultCamera.classList.add(
                    "hidden"
                );
            }


            /* CLEAR OLD DETECTION BOX */

            const overlay =
                document.getElementById(
                    "defectOverlay"
                );

            if (overlay) {
                overlay.innerHTML = "";
            }


            /* VALIDATION */

            const validation =
                document.getElementById(
                    "validationMessage"
                );

            if (validation) {

                validation.className =
                    "validation-message validation-success";

                validation.innerHTML =
                    "✓ Dam inspection image loaded successfully. Ready for inspection.";
            }


            const startButton =
                document.getElementById(
                    "startInspectionButton"
                );

            if (startButton) {
                startButton.disabled = false;
            }


            const analyzeButton =
                document.getElementById(
                    "analyzeButton"
                );

            if (analyzeButton) {
                analyzeButton.disabled = false;
            }


            const analysis =
                document.getElementById(
                    "analysis"
                );

            if (analysis) {

                analysis.innerHTML =
                    "Image loaded. Click <b>Start Inspection</b>.";
            }


            clearPreviousResults();

            notify(
                "Image loaded successfully"
            );
        }
    );
}


/* =====================================================
   CLEAR PREVIOUS RESULTS
   ===================================================== */

function clearPreviousResults() {

    const dashboardAlert =
        document.getElementById(
            "dashboardAlert"
        );

    if (dashboardAlert) {
        dashboardAlert.innerText =
            "WAITING FOR INSPECTION";
    }


    const dashboardDefect =
        document.getElementById(
            "dashboardDefect"
        );

    if (dashboardDefect) {
        dashboardDefect.innerText =
            "No Analysis";
    }


    const dashboardSeverity =
        document.getElementById(
            "dashboardSeverity"
        );

    if (dashboardSeverity) {
        dashboardSeverity.innerText =
            "—";
    }


    const dashboardConfidence =
        document.getElementById(
            "dashboardConfidence"
        );

    if (dashboardConfidence) {
        dashboardConfidence.innerText =
            "—";
    }


    const dashboardLocation =
        document.getElementById(
            "dashboardLocation"
        );

    if (dashboardLocation) {
        dashboardLocation.innerText =
            "—";
    }


    const list =
        document.getElementById(
            "dashboardDefectList"
        );

    if (list) {

        list.innerHTML =
            "<p>No inspection performed yet.</p>";
    }


    const detection =
        document.getElementById(
            "detectionImageBox"
        );

    if (detection) {

        detection.innerHTML =
            `<div class="map-empty">
                No inspection analyzed yet.
            </div>`;
    }


    const map =
        document.getElementById(
            "defectMapContainer"
        );

    if (map) {

        map.innerHTML =
            `<div class="map-empty">
                No analyzed inspection available.
            </div>`;
    }


    const legend =
        document.getElementById(
            "mapLegend"
        );

    if (legend) {
        legend.classList.add("hidden");
    }


    const report =
        document.getElementById(
            "reportBody"
        );

    if (report) {

        report.innerHTML =
            `<tr>
                <td colspan="5">
                    No inspection analyzed yet.
                </td>
            </tr>`;
    }


    const reportCount =
        document.getElementById(
            "reportDefectCount"
        );

    if (reportCount) {
        reportCount.innerText = "0";
    }
}


/* =====================================================
   START INSPECTION
   ===================================================== */

function startInspection() {

    if (!validInspectionImage) {

        notify(
            "Please upload an image first"
        );

        return;
    }


    const overlay =
        document.getElementById(
            "imageOverlay"
        );

    if (overlay) {

        overlay.classList.remove(
            "hidden"
        );

        overlay.innerText =
            "🔍 SCANNING DAM STRUCTURE...";
    }


    const analysis =
        document.getElementById(
            "analysis"
        );

    if (analysis) {

        analysis.innerHTML =
            "Robot is scanning the uploaded structure...";
    }


    const progress =
        document.getElementById(
            "progress"
        );

    if (progress) {
        progress.innerText = "72%";
    }


    const progressBar =
        document.getElementById(
            "progressBar"
        );

    if (progressBar) {
        progressBar.style.width =
            "72%";
    }


    notify(
        "Inspection started"
    );


    setTimeout(function () {

        if (overlay) {

            overlay.innerText =
                "✓ SCAN COMPLETE";
        }

        if (analysis) {

            analysis.innerHTML =
                "Scan completed. Click <b>Analyze Image</b> to detect structural conditions.";
        }

    }, 1500);
}


/* =====================================================
   DEFECT DATABASE
   ===================================================== */

const defectDatabase = {

    crack: {

        type: "Crack",

        severity: "High",

        confidence: 94,

        location: "Section B-03",

        length: "24 cm",

        affectedArea:
            "Structural wall surface",

        risk:
            "Crack may expand under continuous structural stress.",

        action:
            "Schedule detailed structural inspection and repair.",

        description:
            "A visible structural crack has been identified on the inspected dam surface.",

        x: 61,
        y: 49,
        width: 18,
        height: 14,

        color: "#e00000"
    },


    leakage: {

        type: "Leakage",

        severity: "Critical",

        confidence: 96,

        location: "Section C-02",

        length: "31 cm",

        affectedArea:
            "Water seepage region",

        risk:
            "Continuous leakage may indicate water penetration or structural weakness.",

        action:
            "Immediate maintenance inspection and leakage sealing recommended.",

        description:
            "Water seepage / leakage has been identified in the inspected area.",

        x: 48,
        y: 61,
        width: 16,
        height: 20,

        color: "#8b35c8"
    },


    corrosion: {

        type: "Corrosion",

        severity: "Medium",

        confidence: 91,

        location: "Section B-07",

        length: "18 cm",

        affectedArea:
            "Metal-reinforced surface",

        risk:
            "Progressive corrosion may reduce material strength over time.",

        action:
            "Inspect affected surface and monitor corrosion progression.",

        description:
            "Surface corrosion has been identified in the inspected region.",

        x: 26,
        y: 34,
        width: 20,
        height: 17,

        color: "#f07800"
    },


    none: {

        type: "No Defect",

        severity: "Low",

        confidence: 97,

        location: "Section A-01",

        length: "—",

        affectedArea:
            "None",

        risk:
            "No visible structural defect identified.",

        action:
            "Continue routine monitoring.",

        description:
            "No visible crack, leakage or corrosion was detected.",

        x: 0,
        y: 0,
        width: 0,
        height: 0,

        color: "#15965b"
    }
};


/* =====================================================
   DEMO DETECTION
   ===================================================== */

function generateDemoDetection() {

    let hash = 0;


    for (
        let i = 0;
        i < uploadedFileName.length;
        i++
    ) {

        hash =
            uploadedFileName.charCodeAt(i) +
            ((hash << 5) - hash);
    }


    hash =
        Math.abs(hash);


    const defectTypes = [
        "crack",
        "leakage",
        "corrosion",
        "none"
    ];


    const selectedType =
        defectTypes[
            hash % defectTypes.length
        ];


    return {

        ...defectDatabase[selectedType],

        fileName:
            uploadedFileName
    };
}


/* =====================================================
   ANALYZE IMAGE
   ===================================================== */

function analyzeImage() {

    if (!validInspectionImage) {

        notify(
            "Upload an inspection image first"
        );

        return;
    }


    const overlay =
        document.getElementById(
            "imageOverlay"
        );

    if (overlay) {

        overlay.classList.remove(
            "hidden"
        );

        overlay.innerText =
            "🧠 ANALYZING INSPECTION IMAGE...";
    }


    const analysis =
        document.getElementById(
            "analysis"
        );

    if (analysis) {

        analysis.innerHTML =
            "AI is analyzing the uploaded inspection image...";
    }


    /*
     * Small delay only for
     * Level-1 prototype effect.
     */

    setTimeout(function () {

        try {

            const result =
                generateDemoDetection();


            detectedDefects = [
                result
            ];


            inspectionCompleted =
                true;


            /*
             * Update all sections
             */

            drawDefectBoxes();

            updateDashboard();

            updateDetectionPage();

            updateDefectMap();

            updateReport();


            /*
             * Complete analysis
             */

            if (overlay) {

                overlay.innerText =
                    "✓ ANALYSIS COMPLETE";
            }


            if (analysis) {

                analysis.innerHTML = `
                    <b>
                        ${getDefectEmoji(result.type)}
                        ${result.type}
                    </b>

                    <br><br>

                    Severity:
                    <b>${result.severity}</b>

                    <br>

                    Confidence:
                    <b>${result.confidence}%</b>

                    <br>

                    Location:
                    <b>${result.location}</b>
                `;
            }


            notify(
                `${result.type} analysis completed`
            );


        } catch (error) {

            console.error(
                "AquaScan Analysis Error:",
                error
            );


            if (overlay) {

                overlay.innerText =
                    "❌ ANALYSIS ERROR";
            }


            if (analysis) {

                analysis.innerHTML =
                    "Analysis failed. Please refresh the page and try again.";
            }


            notify(
                "Analysis failed"
            );
        }

    }, 1200);
}


/* =====================================================
   DRAW DEFECT BOX - LIVE INSPECTION
   ===================================================== */

function drawDefectBoxes() {

    const overlay =
        document.getElementById(
            "defectOverlay"
        );


    if (!overlay) return;


    overlay.innerHTML = "";


    const defect =
        detectedDefects[0];


    if (!defect) return;


    if (
        defect.type === "No Defect"
    ) {

        return;
    }


    const box =
        document.createElement("div");


    box.className =
        "defect-box";


    box.style.left =
        defect.x + "%";


    box.style.top =
        defect.y + "%";


    box.style.width =
        defect.width + "%";


    box.style.height =
        defect.height + "%";


    box.style.borderColor =
        defect.color;


    const label =
        document.createElement("div");


    label.className =
        "defect-label";


    label.style.background =
        defect.color;


    label.innerText =
        `${defect.type} • ${defect.confidence}%`;


    box.appendChild(label);


    overlay.appendChild(box);
}


/* =====================================================
   DASHBOARD
   ===================================================== */

function updateDashboard() {

    const defect =
        detectedDefects[0];


    if (!defect) return;


    const setText =
        function(id, value) {

            const element =
                document.getElementById(id);

            if (element) {

                element.innerText =
                    value;
            }
        };


    setText(
        "dashboardDefect",
        defect.type
    );


    setText(
        "dashboardSeverity",
        defect.severity
    );


    setText(
        "dashboardConfidence",
        defect.confidence + "%"
    );


    setText(
        "dashboardLocation",
        defect.location
    );


    const alert =
        document.getElementById(
            "dashboardAlert"
        );


    if (alert) {

        if (
            defect.type === "No Defect"
        ) {

            alert.innerText =
                "✓ NO DEFECT DETECTED";

            alert.style.background =
                "#e2f8ed";

            alert.style.color =
                "#148653";

        } else {

            alert.innerText =
                "⚠ DEFECT DETECTED";

            alert.style.background =
                "#ffe1e1";

            alert.style.color =
                "#c52d2d";
        }
    }


    const list =
        document.getElementById(
            "dashboardDefectList"
        );


    if (list) {

        list.innerHTML = `
            <div class="defect">

                ${getDefectEmoji(defect.type)}

                <b>
                    ${defect.type}
                </b>

                <span>
                    ${defect.location}
                </span>

            </div>
        `;
    }
}


/* =====================================================
   DETECTION PAGE
   ===================================================== */

function updateDetectionPage() {

    const defect =
        detectedDefects[0];


    if (!defect) return;


    const container =
        document.getElementById(
            "detectionImageBox"
        );


    if (!container) return;


    container.innerHTML = `

        <div class="detection-wrapper">

            <img
                id="detectionActualImage"
                src="${uploadedDamImage}"
                alt="Analyzed dam image"
            >

            <div id="detectionBoxes">
            </div>

        </div>
    `;


    const image =
        document.getElementById(
            "detectionActualImage"
        );


    /*
     * IMPORTANT:
     * Wait until image is loaded.
     */

    image.onload =
        function () {

            const detectionBoxes =
                document.getElementById(
                    "detectionBoxes"
                );


            if (!detectionBoxes) return;


            detectionBoxes.innerHTML =
                "";


            /*
             * For this Level-1 prototype,
             * coordinates are percentages
             * of the displayed image.
             */

            if (
                defect.type !== "No Defect"
            ) {

                const box =
                    document.createElement(
                        "div"
                    );


                box.className =
                    "defect-box";


                box.style.left =
                    defect.x + "%";


                box.style.top =
                    defect.y + "%";


                box.style.width =
                    defect.width + "%";


                box.style.height =
                    defect.height + "%";


                box.style.borderColor =
                    defect.color;


                const label =
                    document.createElement(
                        "div"
                    );


                label.className =
                    "defect-label";


                label.style.background =
                    defect.color;


                label.innerText =
                    `${defect.type} • ${defect.confidence}%`;


                box.appendChild(label);


                detectionBoxes.appendChild(
                    box
                );
            }
        };


    /*
     * Handle cached image.
     */

    if (image.complete) {

        image.onload();
    }


    setTextSafe(
        "detectionType",
        defect.type
    );

    setTextSafe(
        "detectionSeverity",
        defect.severity
    );

    setTextSafe(
        "confidenceValue",
        defect.confidence + "%"
    );

    setTextSafe(
        "detectionLocation",
        defect.location
    );

    setTextSafe(
        "detectionLength",
        defect.length
    );

    setTextSafe(
        "detectionAction",
        defect.action
    );
}


/* =====================================================
   DEFECT LOCATION MAP
   ===================================================== */

function updateDefectMap() {

    const container =
        document.getElementById(
            "defectMapContainer"
        );


    const defect =
        detectedDefects[0];


    if (
        !container ||
        !inspectionCompleted ||
        !uploadedDamImage ||
        !defect
    ) {

        if (container) {

            container.innerHTML = `
                <div class="map-empty">
                    No analyzed inspection available.
                </div>
            `;
        }

        return;
    }


    /*
     * IMPORTANT:
     * Same uploaded image.
     * No new upload.
     * No new analysis.
     */

    container.innerHTML = `

        <div class="map-image-wrapper">

            <img
                id="mapActualImage"
                src="${uploadedDamImage}"
                alt="Analyzed dam inspection map"
            >

            <div id="mapMarkers">
            </div>

        </div>
    `;


    const image =
        document.getElementById(
            "mapActualImage"
        );


    const createMarker =
        function () {

            const markers =
                document.getElementById(
                    "mapMarkers"
                );


            if (!markers) return;


            markers.innerHTML =
                "";


            /*
             * NO DEFECT
             */

            if (
                defect.type === "No Defect"
            ) {

                markers.innerHTML = `
                    <div class="map-empty">

                        🟢

                        <br><br>

                        NO DEFECT DETECTED

                        <br><br>

                        Confidence:
                        ${defect.confidence}%

                    </div>
                `;

                return;
            }


            /*
             * EXACT CENTER OF
             * DETECTED REGION
             */

            const marker =
                document.createElement(
                    "div"
                );


            marker.className =
                "map-marker";


            marker.style.left =
                (
                    defect.x +
                    defect.width / 2
                ) + "%";


            marker.style.top =
                (
                    defect.y +
                    defect.height / 2
                ) + "%";


            marker.style.background =
                defect.color;


            const label =
                document.createElement(
                    "div"
                );


            label.className =
                "map-marker-label";


            label.innerText =
                `${getDefectEmoji(defect.type)} ${defect.type}`;


            marker.appendChild(
                label
            );


            markers.appendChild(
                marker
            );


            const legend =
                document.getElementById(
                    "mapLegend"
                );


            if (legend) {

                legend.classList.remove(
                    "hidden"
                );
            }
        };


    image.onload =
        function () {

            createMarker();
        };


    /*
     * Handle cached image.
     */

    if (image.complete) {

        createMarker();
    }
}


/* =====================================================
   VIEW ON MAP
   ===================================================== */

function showMapDirectly() {

    if (
        !inspectionCompleted ||
        detectedDefects.length === 0 ||
        !uploadedDamImage
    ) {

        notify(
            "Analyze an inspection image first"
        );

        showPage("inspection");

        return;
    }


    /*
     * IMPORTANT:
     * Do NOT upload another image.
     * Use existing inspection result.
     */

    updateDefectMap();

    showPage("map");

    notify(
        "Showing exact detected defect location"
    );
}


/* =====================================================
   DEFECT-SPECIFIC REPORT
   ===================================================== */

function updateReport() {

    const body =
        document.getElementById(
            "reportBody"
        );


    const defect =
        detectedDefects[0];


    if (!body || !defect) return;


    body.innerHTML = `

        <tr>

            <td>
                ${getDefectEmoji(defect.type)}
                ${defect.type}
            </td>

            <td>
                ${defect.location}
            </td>

            <td>
                ${defect.severity}
            </td>

            <td>
                ${defect.confidence}%
            </td>

            <td>
                ${
                    defect.type === "No Defect"
                        ? "Clear"
                        : "Review Required"
                }
            </td>

        </tr>
    `;


    const count =
        document.getElementById(
            "reportDefectCount"
        );


    if (count) {

        count.innerText =
            defect.type === "No Defect"
                ? "0"
                : "1";
    }
}


/* =====================================================
   DETAILED REPORT
   ===================================================== */

function createDetailedReport() {

    const defect =
        detectedDefects[0];


    if (!defect) {
        return "";
    }


    let report = "";


    report +=
        "AQUASCAN AI - INSPECTION REPORT\n";

    report +=
        "========================================\n\n";


    report +=
        "Inspection ID: AS-2026-001\n";

    report +=
        "Structure: Dam Section A\n";

    report +=
        "Image: " +
        defect.fileName +
        "\n\n";


    report +=
        "----------------------------------------\n";

    report +=
        "DETECTION SUMMARY\n";

    report +=
        "----------------------------------------\n\n";


    report +=
        "Detected Condition: " +
        defect.type +
        "\n";


    report +=
        "Location: " +
        defect.location +
        "\n";


    report +=
        "Severity: " +
        defect.severity +
        "\n";


    report +=
        "AI Confidence: " +
        defect.confidence +
        "%\n";


    report +=
        "Affected Area: " +
        defect.affectedArea +
        "\n";


    report +=
        "Estimated Length: " +
        defect.length +
        "\n\n";


    report +=
        "----------------------------------------\n";

    report +=
        "DEFECT DETAILS\n";

    report +=
        "----------------------------------------\n\n";


    report +=
        defect.description +
        "\n\n";


    report +=
        "Potential Risk:\n" +
        defect.risk +
        "\n\n";


    report +=
        "Recommended Action:\n" +
        defect.action +
        "\n\n";


    report +=
        "----------------------------------------\n";

    report +=
        "LOCATION COORDINATES\n";

    report +=
        "----------------------------------------\n\n";


    report +=
        "X Position: " +
        defect.x +
        "%\n";


    report +=
        "Y Position: " +
        defect.y +
        "%\n";


    report +=
        "\n========================================\n";


    report +=
        "AquaScan AI Level-1 Working Prototype\n";


    report +=
        "========================================\n";


    return report;
}


/* =====================================================
   SAVE DETECTION
   ===================================================== */

function saveDetection() {

    if (!inspectionCompleted) {

        notify(
            "No detection available to save"
        );

        return;
    }


    notify(
        `${detectedDefects[0].type} detection saved successfully`
    );
}


/* =====================================================
   DOWNLOAD REPORT
   ===================================================== */

function downloadReport() {

    if (
        !inspectionCompleted ||
        detectedDefects.length === 0
    ) {

        notify(
            "Analyze an inspection first"
        );

        return;
    }


    const report =
        createDetailedReport();


    const file =
        new Blob(
            [report],
            {
                type: "text/plain"
            }
        );


    const link =
        document.createElement("a");


    link.href =
        URL.createObjectURL(file);


    link.download =
        `AquaScan_${detectedDefects[0].type}_Report.txt`;


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    notify(
        `${detectedDefects[0].type} report generated`
    );
}


/* =====================================================
   PAUSE / STOP
   ===================================================== */

function pauseInspection() {

    notify(
        "Inspection paused"
    );
}


function stopInspection() {

    const overlay =
        document.getElementById(
            "imageOverlay"
        );


    if (overlay) {

        overlay.classList.add(
            "hidden"
        );
    }


    const analysis =
        document.getElementById(
            "analysis"
        );


    if (analysis) {

        analysis.innerText =
            "Inspection stopped.";
    }


    notify(
        "Inspection stopped"
    );
}


/* =====================================================
   EMOJI
   ===================================================== */

function getDefectEmoji(type) {

    if (type === "Crack") {
        return "🔴";
    }

    if (type === "Leakage") {
        return "🟣";
    }

    if (type === "Corrosion") {
        return "🟠";
    }

    return "🟢";
}


/* =====================================================
   SAFE TEXT UPDATE
   ===================================================== */

function setTextSafe(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.innerText =
            value;
    }
}


/* =====================================================
   TOAST
   ===================================================== */

function notify(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) return;


    toast.innerText =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );
}