function showAdjustmentForm(formContext) {
    debugger;
    var id = formContext.data.entity.getId();
    Xrm.Navigation.openForm({
        entityName: "cr9bc_transaction",
        useQuickCreateForm: true,
    }, {
        cr9bc_loyaltymember: id,
        cr9bc_loyaltymembername: formContext
            .getAttribute("cr9bc_membername")
            .getValue(),
        cr9bc_transactiontype: "3",
    }).then(function success(result) {
        if (result && result.savedEntityReference) {
            var transactionId = result.savedEntityReference[0].id;
            var record = Xrm.WebApi.retrieveRecord("cr9bc_transaction", transactionId, "?$select=cr9bc_pointsearned");
            record.then(function (data) {
                var pointsBalance = formContext.getAttribute("cr9bc_pointsbalance");
                pointsBalance.setValue(pointsBalance.getValue() + data.cr9bc_pointsearned);
                formContext.data.save();
            });
        }
    }, function error() {
        console.log("Error");
    });
    function addGlobalCSSRuleAlt(selector, rules) {
        var styleSheet = document.querySelector("#dynamicStyles");
        if (!styleSheet) {
            styleSheet = document.createElement("style");
            styleSheet.id = "dynamicStyles";
            document.head.appendChild(styleSheet);
        }
        styleSheet.textContent += selector + " { " + rules + " }\n";
    }
    addGlobalCSSRuleAlt("section", "align-self: center !important;");
    addGlobalCSSRuleAlt("#quickCreateRoot2", "align-self: center !important;");
}
