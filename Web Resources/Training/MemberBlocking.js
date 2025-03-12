function BlockMember(formContext) {
    var width = 450;
    var height = 300;
    var left = (window.outerWidth - width) / 2 + window.screenX;
    var top = (window.outerHeight - height) / 2 + window.screenY;
    var url = Xrm.Utility.getGlobalContext().getClientUrl() + "/WebResources/cr9bc_memberblockingreason.html";
    window.open(url, "_blank", "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",resizable=no,scrollbars=no");
}
function UnblockMember(formContext) {
    formContext.getAttribute("cr9bc_blocked").setValue(false);
    formContext.getAttribute("cr9bc_blockreason").setValue(null);
    formContext.getAttribute("cr9bc_blockdate").setValue(null);
    formContext.getAttribute("statecode").setValue(0);
    formContext.getAttribute("statuscode").setValue(1);
    formContext.data.save();
}
function BlockStatusAutomation(executionContext) {
    var formContext = executionContext.getFormContext();
    formContext.ui.tabs
        .get("generaltab")
        .sections.get("general")
        .setVisible(!formContext.getAttribute("cr9bc_blocked").getValue());
    formContext.ui.tabs
        .get("generaltab")
        .sections.get("blocked")
        .setVisible(formContext.getAttribute("cr9bc_blocked").getValue());
}
function BlockSelected(primaryControl) {
    var reason = prompt("Enter the reason for blocking the selected members", "Test");
    if (!reason)
        return;
    Xrm.Navigation.openConfirmDialog({
        text: "Are you sure you want to block " + primaryControl
            .getGrid()
            .getSelectedRows()
            .getLength() + " Selected Member" + (primaryControl.getGrid().getSelectedRows().getLength() > 1 ? "s" : "") + "?",
        title: "Caution! You Are About To Block Members",
    }).then(function (result) {
        var UpdatedMembersCount = 0;
        if (!result.confirmed)
            return;
        primaryControl
            .getGrid()
            .getSelectedRows()
            .get()
            .forEach(function (row) {
            console.log(row.data.entity.getId());
            var guid = row.data.entity.getId();
            var entityName = row.data.entity.getEntityName();
            var entity = {
                cr9bc_blocked: true,
                cr9bc_blockreason: reason,
                cr9bc_blockdate: new Date(),
                statecode: 1,
                statuscode: 2,
            };
            Xrm.WebApi.updateRecord(entityName, guid, entity).then(function () {
                UpdatedMembersCount += 1;
                if (UpdatedMembersCount == primaryControl.getGrid().getSelectedRows().getLength()) {
                    Xrm.Navigation.openAlertDialog({
                        title: "Success!",
                        text: "Selected Member" + (UpdatedMembersCount > 1 ? 's' : '') + " have been blocked successfully!"
                    });
                    primaryControl.refresh();
                }
            }).catch(function (error) {
                Xrm.Navigation.openAlertDialog({
                    text: "Error blocking member: " + error.message,
                    title: "Error!",
                });
            });
        });
    });
}
function UnblockSelectedMembers(primaryControl) {
    Xrm.Navigation.openConfirmDialog({
        text: "Are you sure you want to unblock " + primaryControl
            .getGrid()
            .getSelectedRows()
            .getLength() + " Selected Member" + (primaryControl.getGrid().getSelectedRows().getLength() > 1 ? "s" : "") + "?",
        title: "Caution! You Are About To Unblock Members",
    }).then(function (result) {
        var UpdatedMembersCount = 0;
        if (!result.confirmed)
            return;
        primaryControl
            .getGrid()
            .getSelectedRows()
            .get()
            .forEach(function (row) {
            console.log(row.data.entity.getId());
            var guid = row.data.entity.getId();
            var entityName = row.data.entity.getEntityName();
            var entity = {
                cr9bc_blocked: false,
                cr9bc_blockreason: null,
                cr9bc_blockdate: null,
                statecode: 0,
                statuscode: 1,
            };
            Xrm.WebApi.updateRecord(entityName, guid, entity).then(function () {
                UpdatedMembersCount += 1;
                if (UpdatedMembersCount == primaryControl.getGrid().getSelectedRows().getLength()) {
                    Xrm.Navigation.openAlertDialog({
                        title: "Success!",
                        text: "Selected Member" + (UpdatedMembersCount > 1 ? 's' : '') + " have been unblocked successfully!"
                    });
                    primaryControl.refresh();
                }
            }).catch(function (error) {
                Xrm.Navigation.openAlertDialog({
                    text: "Error unblocking member: " + error.message,
                    title: "Error!",
                });
            });
        });
    });
}
