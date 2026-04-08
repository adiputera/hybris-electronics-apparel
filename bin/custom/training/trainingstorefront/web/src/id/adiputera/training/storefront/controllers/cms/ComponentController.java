package id.adiputera.training.storefront.controllers.cms;

import de.hybris.platform.acceleratorstorefrontcommons.controllers.pages.AbstractPageController;
import de.hybris.platform.cms2.exceptions.CMSItemNotFoundException;
import de.hybris.platform.cms2.model.pages.AbstractPageModel;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * The class ComponentController
 *
 * @author Yusuf F. Adiputera
 */
@Controller
public class ComponentController extends AbstractPageController {

    private static final String FRAGMENTS_CMS_CONTENT_SLOT = "fragments/cms/cmscontentslot"; // NOSONAR
    private static final String FRAGMENTS_CMS_COMPONENT = "fragments/cms/cmscomponent"; // NOSONAR

    @GetMapping(value = "/cms-components")
    public String renderComponentsOfTheSlot(final Model model,
                                            final HttpServletRequest request,
                                            final HttpServletResponse response,
                                            @RequestParam Map<String, String> parameters)
            throws CMSItemNotFoundException
    {
        final String componentUid = parameters.get("componentUid");
        final String componentElement = parameters.get("componentElement");
        final String componentClass = parameters.get("componentClass");

        model.addAttribute("componentElement", componentElement);
        model.addAttribute("componentClass", componentClass);

        if (StringUtils.isNotBlank(componentUid)) {
            model.addAttribute("componentUid", componentUid);
            return FRAGMENTS_CMS_COMPONENT;
        }
        final String pageId = parameters.get("pageId");
        AbstractPageModel pageModel = getContentPageForLabelOrId(pageId);
        if (null != pageModel) {
            storeCmsPageInModel(model, pageModel);
            final String slotPosition = parameters.get("slotPosition");
            final String slotElement = parameters.get("slotElement");
            final String slotClass = parameters.get("slotClass");
            model.addAttribute("slotPosition", slotPosition);
            model.addAttribute("slotElement", slotElement);
            model.addAttribute("slotClass", slotClass);
            return FRAGMENTS_CMS_CONTENT_SLOT;
        }
        throw new CMSItemNotFoundException("Page not found");
    }
}
